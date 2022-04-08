import { Response } from "express";
import { Model } from "mongoose";
import { ResponseError } from "../validators/errors.factory";

export class Field {
  constructor(public name: string = name, public value: any = value) {}

  // not sure 'bout Model<any>, not safe
  async checkForExistence(ent: Model<any>, res: Response) {
    const found = await ent.findOne({ [this.name]: this.value });
    if (!found) {
      throw new ResponseError(res).buildNotFoundServerError().execute();
    }
    return found;
  }
}
