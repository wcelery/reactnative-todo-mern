import { Todo, ITodo } from "../models";
import { PaginationFactory } from "../utils/pagination.factory";
export interface IQuery {
  search?: string;
  status?: string;
  page?: number;
}

export class TodoService {
  async findByQuery(query: IQuery) {
    const pagination = new PaginationFactory();

    const searchQuery = pagination.getFilter(query);
    // you can pass limit by req.query too, by default it will remain 10
    const { limit, offset } = pagination.getPagination(query.page);
    // mongoose-paginate doesn't have proper typings yet
    // @ts-ignore
    const todos = await Todo.paginate(searchQuery, { offset, limit });
    return {
      ...todos,
      page: todos.page - 1,
      prevPage: todos.prevPage - 1,
      nextPage: todos.nextPage - 1,
    };
  }

  async createOrUpdateTodo(todoBody: ITodo, id: string) {
    let todo: ITodo = await Todo.findOne({ _id: id });
    if (todo) {
      todo = await Todo.findOneAndUpdate({ _id: id }, { $set: todoBody }, { new: true });
      return todo;
    }

    todo = await Todo.create(todoBody);
    return todo;
  }

  async deleteTodo(id: string) {
    await Todo.findByIdAndRemove({ _id: id });
  }
}
