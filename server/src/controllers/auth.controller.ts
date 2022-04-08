import { Request, Response } from "express";

import { User } from "../models";
import { Field } from "../utils/checkForExistence";
import { AuthService } from "../services";
import { ValidatorFactory } from "../validators";

const validator = new ValidatorFactory();

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    const user = await validator.errorHandler(
      this.authService.registerUser,
      res,
      req.body
    );
    res.send(user);
  }

  async login(req: Request, res: Response) {
    await new Field("email", req.body.email).checkForExistence(User, res);
    const token = await validator.errorHandler(this.authService.loginUser, res, req.body);
    res.send(token);
  }
}

export const authController = new AuthController(new AuthService());
