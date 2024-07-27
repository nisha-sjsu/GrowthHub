import * as express from "express";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import Task from "../models/task";
import Mission from "../models/mission";

import AuthMiddleware from "../middleware/auth.middleware";

export class MissionController {
  private authMiddleware;

  public path = "/missions";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.authMiddleware = new AuthMiddleware();
    this.router.use(this.authMiddleware.verifyToken);
    this.router.post("/mission", this.createMission);
    this.router.get("/:missionId/tasks", this.getTasksOfMission);
    this.router.get("/mission/:missionId", this.getSpecificMissionData);
    this.router.get("/task/:taskId", this.getTask);
    this.router.get("/created-missions", this.getMissions);
    this.router.get("/public-missions", this.getPublicMissions);
    this.router.patch("/mission/:missionId", this.updateMission);
    this.router.patch("/task/:taskId", this.updateTask);
    this.router.get("/warrior-missions", this.getWarriorMissions);
    this.router.post('/clone', this.cloneMission);
  }

  // Controller function to create a mission and its tasks
  public async createMission(req: Request, res: Response) {
    try {
      // Extract mission data from request body
      const {
        title,
        missionObjective,
        startDate,
        endDate,
        publicMission,
        category,
        expectationFromAp,
        tasks, // Assuming tasks is an array of task objects
      } = req.body;

      // Generate unique missionId
      const missionId = uuidv4();

      // Create mission object
      const newMission = new Mission({
        userId: req.userSub,
        missionId,
        missionName: title,
        missionObjective,
        status: "in-progress",
        startDate,
        endDate,
        publicMission,
        parentMissionId: null,
        totalReplications: 0,
        assignedAPId: "",
        missionCategory: category,
        expectationFromAp,
        tasks: [],
        comments: [],
      });

      // Save mission to missions collection
      const mission = await Mission.create(newMission);

      // Function to generate dates based on repetition type
      const generateDates = (
        start: string,
        end: string,
        repetitionType: string
      ): string[] => {
        const dates = [];
        const currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
          dates.push(currentDate.toISOString().split("T")[0]); // Store date as YYYY-MM-DD format
          switch (repetitionType.toLowerCase()) {
            case "daily":
              currentDate.setDate(currentDate.getDate() + 1);
              break;
            case "alternate days":
              currentDate.setDate(currentDate.getDate() + 2);
              break;
            case "weekly":
              currentDate.setDate(currentDate.getDate() + 7);
              break;
            case "monthly":
              currentDate.setMonth(currentDate.getMonth() + 1);
              break;
          }
        }

        return dates;
      };

      // Create tasks with generated dates
      const tasksWithMissionId = tasks.flatMap((task: any) => {
        const dates = generateDates(
          task.taskStartDate,
          task.taskEndDate,
          task.repetitionType
        );
        return dates.map((date) => ({
          missionId,
          taskId: uuidv4(),
          taskTitle: task.taskTitle,
          taskStatus: "in-progress",
          expectedCompletionDate: date,
          taskStartDate: date,
          taskEndDate: date, // same as start date for single day tasks
        }));
      });

      // Save tasks to tasks collection
      await Task.insertMany(tasksWithMissionId);

      // Return success response with created mission and tasks
      res.status(201).json({ mission, tasks: tasksWithMissionId });
    } catch (error) {
      // Handle errors
      console.error("Error creating mission:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateMission(req: Request, res: Response) {
    try {
      const { missionId } = req.params;
      const updateFields = req.body;

      // Check if the mission exists
      const mission = await Mission.findOne({ missionId: missionId });
      if (!mission) {
        return res.status(404).json({
          title: "Mission not found",
          detail: "Mission with the provided ID does not exist",
          code: 404,
        });
      }

      // Update the comments
      if (updateFields.comments) {
        // Assuming updateFields.comments is an array of comments
        mission.comments.push(
          ...updateFields.comments.map(
            (comment: { userId: string; comment: string }) => ({
              userId: comment.userId,
              comment: comment.comment,
            })
          )
        );
        updateFields.comments = mission.comments;
      }

      console.log("updateFields", updateFields);
      // Update the mission using updateOne
      const updatedMission = await Mission.updateOne(
        { missionId: missionId },
        updateFields
      );

      res.status(200).json({ data: updatedMission });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const updateFields = req.body;

      // Check if the mission exists
      const mission = await Task.findOne({ taskId: taskId });
      if (!mission) {
        return res.status(404).json({
          title: "Task not found",
          detail: "Task with the provided ID does not exist",
          code: 404,
        });
      }

      // Update the mission using updateOne
      const updatedTask = await Task.updateOne(
        { taskId: taskId },
        updateFields
      );

      res.status(200).json({ data: updatedTask });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async getTasksOfMission(req: Request, res: Response) {
    try {
      const missionId = req.params.missionId;

      // Query tasks associated with the provided missionId
      const tasks = await Task.find({ missionId });

      // Prepare response body
      const responseBody = tasks.map((task) => ({
        missionId: task.missionId,
        taskId: task.taskId,
        taskTitle: task.taskTitle,
        createdDate: task.get("createdAt"),
        status: task.taskStatus,
        expectedCompletionDate: task.expectedCompletionDate,
        completionDate: task.completionDate,
      }));

      // Send response
      res.json({ Tasks: responseBody });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get a specific task
  public async getTask(req: Request, res: Response) {
    try {
      const { missionId, taskId } = req.params;

      // Query task by missionId and taskId
      const task = await Task.findOne({ missionId, taskId });

      // Check if task exists
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Return task
      res.json({ Tasks: task });
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get all missions of a user
  public async getMissions(req: Request, res: Response) {
    try {
      const userId = req.userSub; // extract user ID from the token using middleware

      // Query missions by userId
      const missions = await Mission.find({ userId });

      // Prepare response body
      const responseBody = missions.map((mission) => ({
        Mission: {
          userId: mission.userId,
          missionId: mission.missionId,
          missionName: mission.missionName,
          missionObjective: mission.missionObjective,
          expectationFromAp: mission.expectationFromAp,
          status: mission.status,
          startDate: mission.startDate,
          createdDate: mission.get("createdAt"),
          publicMission: mission.publicMission,
          parentMissionId: mission.parentMissionId,
          totalReplications: mission.totalReplications,
          assignedAPId: mission.assignedAPId,
          missionCategory: mission.missionCategory,
          comments: mission.comments,
        },
      }));

      // Fetch tasks for each mission
      const tasksPromises = missions.map(async (mission) => {
        const tasks = await Task.find({ missionId: mission.missionId });
        return { Tasks: tasks };
      });

      const tasks = await Promise.all(tasksPromises);

      // Combine missions and tasks data
      responseBody.forEach(
        (missionData: { Mission: any; Tasks?: any }, index) => {
          missionData.Mission.tasks = tasks[index].Tasks;
        }
      );

      // Return response
      res.json(responseBody);
    } catch (error) {
      console.error("Error fetching missions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //Get all warrior missions
  public async getWarriorMissions(req: Request, res: Response) {
    try {
      const assignedAPId = req.userSub; // extract user ID from the token using middleware

      // Query missions by userId
      const missions = await Mission.find({ assignedAPId: assignedAPId });

      // Prepare response body
      const responseBody = missions.map((mission) => ({
        Mission: {
          userId: mission.userId,
          missionId: mission.missionId,
          missionName: mission.missionName,
          missionObjective: mission.missionObjective,
          expectationFromAp: mission.expectationFromAp,
          status: mission.status,
          startDate: mission.startDate,
          createdDate: mission.get("createdAt"),
          publicMission: mission.publicMission,
          parentMissionId: mission.parentMissionId,
          totalReplications: mission.totalReplications,
          assignedAPId: mission.assignedAPId,
          missionCategory: mission.missionCategory,
          comments: mission.comments,
        },
      }));

      // Return response
      res.json(responseBody);
    } catch (error) {
      console.error("Error fetching missions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getPublicMissions(req: Request, res: Response) {
    try {
      // Extract search and type parameters from query string
      const { search, type } = req.query;

      // Prepare search criteria
      const searchCriteria: any = {
        publicMission: true, // Ensure only public missions are fetched
      };
      if (search) {
        searchCriteria.$or = [
          { missionName: { $regex: search, $options: "i" } }, // Case-insensitive search in missionName
          { missionObjective: { $regex: search, $options: "i" } }, // Case-insensitive search in missionObjective
        ];
      }
      if (type) {
        searchCriteria.missionCategory = type;
      }

      // Query missions based on search criteria
      const missions = await Mission.find(searchCriteria);

      // Prepare response body
      const responseBody = missions.map((mission) => ({
        Mission: {
          userId: mission.userId,
          missionId: mission.missionId,
          missionName: mission.missionName,
          missionObjective: mission.missionObjective,
          expectationFromAp: mission.expectationFromAp,
          status: mission.status,
          startDate: mission.startDate,
          createdDate: mission.get("createdDate"),
          publicMission: mission.publicMission,
          parentMissionId: mission.parentMissionId,
          totalReplications: mission.totalReplications,
          assignedAPId: mission.assignedAPId,
          missionCategory: mission.missionCategory,
          tasks: [],
          comments: mission.comments,
        },
      }));

      // Fetch tasks for each mission
      const tasksPromises = missions.map(async (mission) => {
        const tasks = await Task.find({ missionId: mission.missionId });
        return { Tasks: tasks };
      });

      const tasks = await Promise.all(tasksPromises);

      // Combine missions and tasks data
      responseBody.forEach((missionData, index) => {
        missionData.Mission.tasks = tasks[index].Tasks;
      });

      // Return response
      res.json(responseBody);
    } catch (error) {
      console.error("Error fetching public missions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Controller function to clone a mission and its tasks
  async cloneMission(req: Request, res: Response) {
    try {
      const {
        missionId
      } = req.body.mission;

      // Retrieve the original mission from the database
      const originalMission = await Mission.findOne({ missionId: missionId });
      if (!originalMission) {
        return res.status(404).json({ error: 'Mission not found' });
      }

      // Generate new missionId for the clone
      const clonedMissionId = uuidv4();

      if (!(originalMission.startDate instanceof Date && originalMission.endDate instanceof Date)) {
        throw new Error("Invalid dates provided. Ensure both startDate and endDate are Date objects.");
      }

      // Normalize dates to remove time components if only date comparison is needed
      const oMissionStart = new Date(originalMission.startDate);
      oMissionStart.setUTCHours(0, 0, 0, 0);
      const oMissionEnd = new Date(originalMission.endDate);
      oMissionEnd.setUTCHours(0, 0, 0, 0);

      const newMissionStartDate = new Date();
      const newMissionEndDate = new Date(new Date().getTime() + oMissionEnd.getTime() - oMissionStart.getTime());
      // Create mission object
      const clonedMission = new Mission({
        userId: req.userSub,
        missionId: clonedMissionId,
        missionName: originalMission.missionName,
        missionObjective: originalMission.missionObjective,
        status: "in-progress",
        startDate: Date.now(),
        endDate: newMissionEndDate,
        publicMission: false,
        parentMissionId: null,
        totalReplications: 0,
        assignedAPId: null,
        missionCategory: originalMission.missionCategory,
        expectationFromAp: originalMission.expectationFromAp,
        tasks: [],
        comments: [],
      });

      const mission = await Mission.create(clonedMission);

      // Retrieve tasks linked to the original mission
      const originalTasks = await Task.find({ missionId: missionId });

      const clonedTasks = originalTasks.map((task: any) => {
        const oldExpectedCompletionTaskDate = new Date(task.expectedCompletionDate);
        oldExpectedCompletionTaskDate.setUTCHours(0, 0, 0, 0);

        const newExpectedCompletionTaskDate = new Date(newMissionStartDate.getTime() + (oldExpectedCompletionTaskDate.getTime() - originalMission.startDate.getTime()));

        return {
          missionId: clonedMissionId,
          taskId: uuidv4(),
          taskTitle: task.taskTitle,
          taskStatus: "in-progress",
          expectedCompletionDate: newExpectedCompletionTaskDate,
        };
      });

      // // Save cloned tasks to the database
      await Task.insertMany(clonedTasks);

      // Return success response with cloned mission and tasks
      res.status(201).json({ mission: clonedMission });
    } catch (error) {
      // Handle errors
      console.error("Error cloning mission:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getSpecificMissionData(req: Request, res: Response) {
      try {
          const missions = await Mission.find({missionId: req.params.missionId}).lean(); // Assume some search criteria

          const missionsWithTasks = await Promise.all(missions.map(async (mission) => {
              const tasks = await Task.find({ missionId: mission.missionId }).lean();
              return { ...mission, tasks }; // Spread and add tasks directly
          }));

          res.json({ missions: missionsWithTasks });
      } catch (error) {
          console.error("Error fetching missions and tasks:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  }
}
