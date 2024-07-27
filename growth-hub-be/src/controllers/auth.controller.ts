import * as express from "express";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import CognitoService from "../services/cognito.service";
import UserController from "./user.controller";

class AuthController {
  public path = "/auth";
  public router = express.Router();
  public userController: UserController;

  constructor() {
    this.initRoutes();
    this.userController = new UserController();
  }

  public initRoutes() {
    this.router.post("/signup", this.validateBody("signUp"), this.signUp);
    this.router.post("/signin", this.validateBody("signIn"), this.signIn);
    this.router.post("/verify", this.validateBody("verify"), this.verify);
    this.router.get("/user/:accessToken", this.getUserAttributes);
  }

  getTimezoneInfo = (): string => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone;
  };

  signUp = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let cognitoService = new CognitoService();

    const {
      username,
      password,
      email,
      gender,
      birthdate,
      name,
      preferredUsername,
      picture,
    } = req.body;
    let userAttr = [];
    userAttr.push({ Name: "email", Value: email });
    userAttr.push({ Name: "gender", Value: gender });
    userAttr.push({ Name: "birthdate", Value: birthdate.toString() });
    userAttr.push({ Name: "name", Value: name });
    userAttr.push({ Name: "zoneinfo", Value: this.getTimezoneInfo() });
    userAttr.push({ Name: "preferred_username", Value: preferredUsername });
    userAttr.push({ Name: "picture", Value: picture });

    cognitoService
      .signUpUser(username, password, userAttr)
      .then((data) => {
        if (data && data.UserSub) {
          req.body.userId = data.UserSub;
          return this.userController.createUserProfile(req, res);
        } else {
          throw new Error("Invalid data returned after sign up");
        }
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
        res.status(500).end(); // Return a 500 status code for internal server error
      });
  };

  signIn = (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    const { username, password } = req.body;
    let cognitoService = new CognitoService();
    cognitoService
      .signInUser(username, password)
      .then((r) => {
        if (r.statusCode == undefined) {
          res.status(200).json({ userTokens: r });
        } else {
          res.status(400).end();
        }
      })
      .catch((error) => {
        console.error("Error signing in user:", error);
        res.status(500).json({ error: "Error signing in user" });
      });
  };

  getUserAttributes = (req: Request, res: Response) => {
    let cognitoService = new CognitoService();
    cognitoService
      .getUserAttributes(req.params.accessToken)
      .then((attributes) => {
        res.status(200).json({ userAttributes: attributes });
      })
      .catch((error) => {
        console.error("Error fetching user attributes:", error);
        res.status(500).json({ error: "Error fetching user attributes" });
      });
  };

  verify = (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    console.log(req.body);
    const { username, code } = req.body;

    let cognitoService = new CognitoService();
    cognitoService.confirmSignUp(username, code).then((success) => {
      success ? res.status(200).end() : res.status(400).end();
    });
  };

  private validateBody(type: string) {
    switch (type) {
      case "signUp":
        return [
          body("username").notEmpty().isLength({ min: 5 }),
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("birthdate").exists().isISO8601(),
          body("gender").notEmpty().isString(),
          body("name").notEmpty().isString(),
        ];
      case "signIn":
        return [body("username").notEmpty().isLength({ min: 5 })];
      case "verify":
        return [
          body("username").notEmpty().isLength({ min: 5 }),
          body("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
        ];
      case "forgotPassword":
        return [body("username").notEmpty().isLength({ min: 5 })];
      case "confirmPassword":
        return [
          body("password").exists().isLength({ min: 8 }),
          body("username").notEmpty().isLength({ min: 5 }),
          body("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
        ];
    }
  }
}

export default AuthController;
