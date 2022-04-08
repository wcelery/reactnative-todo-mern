import { Request, Response } from "express";

import { TodoService } from "../services";
import { ValidatorFactory } from "../validators";

const validator = new ValidatorFactory();

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos(req: Request, res: Response) {
    const todos = await validator.errorHandler(
      this.todoService.findByQuery,
      res,
      req.query
    );
    res.send(todos);
  }

  async createOrUpdateTodo(req: Request, res: Response) {
    const todo = await validator.errorHandler(
      this.todoService.createOrUpdateTodo,
      res,
      req.body,
      req.params?.id
    );
    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const err = await validator.errorHandler(
      this.todoService.deleteTodo,
      res,
      req.params.id
    );
    res.send(err);
  }
}

export const todoController = new TodoController(new TodoService());
