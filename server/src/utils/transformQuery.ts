import { IQuery } from "../services";

abstract class TransformQuery<T> {
  constructor(protected query: T) {}

  public transform() {
    return Object.assign({}, !this.falseyStatement() ? this.writeNewField() : "");
  }

  abstract falseyStatement(): boolean;
  abstract writeNewField(): object;
}

export class IsCompleted extends TransformQuery<IQuery> {
  falseyStatement(): boolean {
    return (
      !this.query.status ||
      this.query.status === "public" ||
      this.query.status === "private"
    );
  }

  writeNewField(): { isCompleted: boolean } {
    return { isCompleted: this.query.status === "completed" ? true : false };
  }
}

export class IsPublic extends TransformQuery<IQuery> {
  falseyStatement(): boolean {
    return (
      !this.query.status ||
      this.query.status === "completed" ||
      this.query.status === "inprogress"
    );
  }

  writeNewField(): { isPublic: boolean } {
    return { isPublic: this.query.status === "public" ? true : false };
  }
}

export class Title extends TransformQuery<IQuery> {
  falseyStatement(): boolean {
    return !this.query.search;
  }

  writeNewField(): { title: { $regex: RegExp; $options: string } } {
    return {
      title: { $regex: new RegExp(this.query.search as string), $options: "i" },
    };
  }
}

export const queryHandler = (params: TransformQuery<IQuery>[]) => {
  const filter = params.map((p) => p.transform());
  // cant figure out the typings here
  return filter.reduce((prev, current) => ({ ...(prev as {}), ...(current as {}) }), {});
};
