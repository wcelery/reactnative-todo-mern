import { Application } from "express";
import todosRouter from "./api/todos.router";
import authRouter from "./api/auth.router";

class AppRouter {
  constructor(private app: Application) {}
  init() {
    this.app.get("/", (_req, res) => {
      res.send("API is running");
    });
    this.app.use("/api/todos", todosRouter);
    this.app.use("/api/auth", authRouter);
  }
}

export default AppRouter;
