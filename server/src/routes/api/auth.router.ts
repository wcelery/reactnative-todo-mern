import { Router } from "express";
import { check } from "express-validator/check";

import { ValidatorFactory } from "../../validators/validator.factory";
import { authController } from "../../controllers";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const authRouter: Router = Router();
const validator = new ValidatorFactory();
const authMiddleware = new AuthMiddleware();

const authValidationRules = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({
    min: 6,
  }),
];

authRouter.post(
  "/register",
  validator.setValidationRules(authValidationRules),
  validator.validate,
  authController.register.bind(authController)
);

authRouter.post(
  "/login",
  validator.setValidationRules(authValidationRules),
  validator.validate,
  authMiddleware.authWithLocalStrategy(),
  authController.login.bind(authController)
);

export default authRouter;
