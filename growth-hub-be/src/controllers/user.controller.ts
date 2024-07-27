import * as express from "express";
import { Request, Response } from "express";

import User, { IUserModel } from "../models/user";

import AuthMiddleware from "../middleware/auth.middleware";
import { error } from "console";

export class UserController {
  private authMiddleware;

  public path = "/users";
  public router = express.Router();

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(this.authMiddleware.verifyToken)
    this.router.get("/user-profile", this.getUserProfile);
    this.router.patch("/user-profile", this.updateUserProfile);
    this.router.get("/user-profile/:userId", this.getUserProfileForGivenId);

    //miscellaneous
    this.router.get("/user-profiles", this.getAllUserProfiles);
    this.router.delete("/user-profile", this.deleteUserProfile);
    this.router.post("/user-apActive", this.updateapActive);
  }

  public async getAllUserProfiles(req: Request, res: Response) {
    try {
      let users = await User.find();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getUserProfile(req: Request, res: Response) {
    const userId = req.userSub; // extract user ID from the token using middleware
    try {
      let user = await User.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async getUserProfileForGivenId(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      let user = await User.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async createUserProfile(req: Request, res: Response) {
    const {
      userId,
      name,
      birthdate,
      gender,
      email,
      educationHistory,
      careerHistory,
      interests,
      profilePicture,
    } = req.body;
    //FIND EXIST USES
    const userExist = await User.exists({ email });
    if (userExist) {
      throw new error({
        title: "emailAddress",
        detail: "Email address is already used",
        code: 422,
      });
    }
    let age = this.getAge(birthdate);
    let user = new User({
      userId,
      name,
      age: age,
      gender,
      email,
      educationHistory,
      careerHistory,
      interests,
      profilePicture,
    });
    try {
      let savedUser = await user.save();
      res.status(201).json({ data: savedUser });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async deleteUserProfile(req: Request, res: Response) {
    const userId = req.userSub; // extract user ID from the token using middleware

    try {
      // Check if the user exists
      let user = await User.findOne({ userId: userId });
      if (!user) {
        return res.status(404).json({
          title: "User not found",
          detail: "User with the provided ID does not exist",
          code: 404,
        });
      }

      // Delete user
      await user.deleteOne();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateUserProfile(req: Request, res: Response) {
    const userId = req.userSub; // extract user ID from the token using middleware
    const updateFields = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({ userId: userId});
      if (!user) {
        return res.status(404).json({
          title: "User not found",
          detail: "User with the provided ID does not exist",
          code: 404,
        });
      }

      // Update user fields
      for (const field in updateFields) {
        if (Object.prototype.hasOwnProperty.call(updateFields, field)) {
          user[field] = updateFields[field];
        }
      }

      // If email is being updated, check for uniqueness
      if (updateFields.email && updateFields.email !== user.email) {
        const userExist = await User.exists({ email: updateFields.email });
        if (userExist) {
          return res.status(422).json({
            title: "emailAddress",
            detail: "Email address is already used",
            code: 422,
          });
        }
      }

      // Save updated user
      const savedUser = await user.save();
      res.status(200).json({ data: savedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateapActive(req: Request, res: Response) {
    try {
      // Extract data from request body
      const userId = req.userSub
      // const { apActive } = req.body;
      

      // Update AP request status to accepted
      await User.findOneAndUpdate(
        { userId: userId},
        { apActive: false}
      );
    

      res.status(200).json({ message: 'status updated' });
    } catch (error) {
      console.error('Error in apActive status change:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  private getAge(birthdate: string) {
    const birthYear = new Date(birthdate).getFullYear();
    const birthMonth = new Date(birthdate).getMonth();
    const birthDay = new Date(birthdate).getDate();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    let age = currentYear - birthYear;

    // Check if the birthday for the current year has already occurred
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }
    return age;
  }
}

export default UserController;
