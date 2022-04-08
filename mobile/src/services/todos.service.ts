import { HttpService } from "./http.service";

export class TodosService extends HttpService {
  constructor() {
    super();
  }

  async getTodos() {
    return await this.get({ url: "todos" });
  }

  async postTodo(todoBody: any, todoId: string = "") {
    console.log("from todosservice", todoBody);
    return await this.post({ url: `todos/${todoId}`, body: todoBody });
  }

  async deleteTodo(todoId: string) {
    console.log("from todosservice", await this.delete({ url: `todos/${todoId}` }));
    return await this.delete({ url: `todos/${todoId}` });
  }
}
