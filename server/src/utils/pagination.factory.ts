import { IQuery } from "../services";
import { IsCompleted, IsPublic, queryHandler, Title } from "./transformQuery";

export class PaginationFactory {
  constructor() {}

  getPagination(page?: number, size?: number) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  getFilter(query: IQuery) {
    const isCompleted = new IsCompleted(query);
    const isPublic = new IsPublic(query);
    const title = new Title(query);
    return queryHandler([isCompleted, isPublic, title]);
  }
}
