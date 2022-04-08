import { Router } from "express";
import { check } from "express-validator/check";

import { ValidatorFactory } from "../../validators/validator.factory";
import { todoController } from "../../controllers";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const todosRouter: Router = Router();
const validator = new ValidatorFactory();
const authMiddleware = new AuthMiddleware();

const todoValidationRules = [
  check("title").trim().escape().not().isEmpty().withMessage("Title can not be empty!"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description can not be empty!"),
];

todosRouter.get(
  "",
  validator.setQueryValidationRules(),
  validator.validate,
  authMiddleware.authWithJWTStrategy(),
  todoController.getAllTodos.bind(todoController)
);
todosRouter.post(
  "/:id?",
  validator.setValidationRules(todoValidationRules),
  validator.validate,
  authMiddleware.authWithJWTStrategy(),
  todoController.createOrUpdateTodo.bind(todoController)
);
todosRouter.delete(
  "/:id",
  authMiddleware.authWithJWTStrategy(),
  todoController.deleteTodo.bind(todoController)
);

export default todosRouter;
