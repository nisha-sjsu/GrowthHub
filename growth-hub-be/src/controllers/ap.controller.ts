import express, { Request, Response } from "express";
import apRequest, { IAPRequestModel } from "../models/apRequest"; 
import User, { IUserModel } from "../models/user";
import Mission from "../models/mission";
import AuthMiddleware from "../middleware/auth.middleware";

export class APRequestController {
  private authMiddleware;
  public path = "/apRequests";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.authMiddleware = new AuthMiddleware();
    this.router.use(this.authMiddleware.verifyToken);
    this.router.post("/ap-request", this.sendAPRequest);
    this.router.get("/ap-profile", this.getAPProfiles);
    this.router.get("/fetch-all-requests", this.getAllRequestsToAp);
    this.router.post("/accept-request", this.acceptRequest);
    this.router.post("/reject-request", this.rejectRequest);
  }

  public async getAllRequestsToAp(req: Request, res: Response) {
    try {
      const apId = req.userSub;

      // Find all requests to the AP
      const requests: IAPRequestModel[] = await apRequest.find({ apId });

      res.status(200).json({ data: requests });
    } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getAPProfiles(req: Request, res: Response) {
    try {

      const userIdToExclude = req.userSub as string | undefined;
      // Check if category query parameter is provided
      const category = req.query.category as string | undefined;

      // Define query conditions
      const query: any = { apActive: true };
      if (userIdToExclude) {
        query.userId = { $ne: userIdToExclude }; // Exclude user with userId
      }
      if (category) {
        query.interests = category; // Assuming interests field contains categories
      }
  
      // Find users based on query conditions
      const users: IUserModel[] = await User.find(query);

      res.status(200).json({ data: users });
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async sendAPRequest(req: Request, res: Response) {
    try {
      const { apId, missionId, expectationFromAp } = req.body;

      const warriorId = req.userSub;

      // Create AP request object
      const newAPRequest: IAPRequestModel = new apRequest({
        apId, // Use the provided apId from the request body
        warriorId,
        missionId: missionId,
        expectationFromAp: expectationFromAp,
      });

      // Save AP request to the database
      await newAPRequest.save();

      res.status(201).json(newAPRequest);
    } catch (error) {
      console.error("Error creating AP request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async acceptRequest(req: Request, res: Response) {
    try {
      // Extract data from request body
      const { missionId, warriorId, apId } = req.body;

      // Update AP request status to accepted
      await apRequest.findOneAndUpdate(
        { missionId, warriorId, apId },
        { status: 'accepted' }
      );

      // Update the assignedAPId field of mission
      await Mission.findOneAndUpdate(
        { missionId },
        { assignedAPId: apId }
      );

      // Update the user (AP's) profile, add missionId to apOfMissions
      await User.findOneAndUpdate(
        { userId: apId },
        { $push: { apOfMissions: missionId } }
      );

      res.status(200).json({ message: 'Request accepted successfully' });
    } catch (error) {
      console.error('Error accepting request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  public async rejectRequest(req: Request, res: Response) {
    try {
      // Extract data from request body
      const { missionId, warriorId, apId } = req.body;

      // Update AP request status to accepted
      await apRequest.findOneAndUpdate(
        { missionId, warriorId, apId },
        { status: 'rejected' }
      );

      // Update the assignedAPId field of mission
      await Mission.findOneAndUpdate(
        { missionId },
        { assignedAPId: apId }
      );

      // Update the user (AP's) profile, add missionId to apOfMissions
      await User.findOneAndUpdate(
        { userId: apId },
        { $push: { apOfMissions: missionId } }
      );

      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      console.error('Error rejected request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


}
