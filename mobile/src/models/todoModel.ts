import { IFormProps } from "../views";

interface ITodoModel extends IFormProps {
  _id: string;
  __v: string;
}

export class TodoModel {
  constructor(private todo: ITodoModel) {}

  removeRedundantFields() {
    const { _id, __v, ...shinyTodo } = this.todo;
    return shinyTodo;
  }
}

const createTodoModel = (todo: ITodoModel) => {
  return new TodoModel(todo).removeRedundantFields();
};

export { createTodoModel };
