import { Document, Model, model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Interface to model the Todo Schema for TypeScript.
 * @param title:string
 * @param description:string
 * @param year:number
 * @param isPublic:boolean
 * @param isCompleted:boolean
 */

export interface ITodo extends Document {
  title: string;
  description: string;
  year: number;
  isPublic: boolean;
  isCompleted: boolean;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Field 'title' is required"],
  },
  description: {
    type: String,
    required: [true, "Field 'description' is required"],
  },
  year: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  isCompleted: {
    type: Boolean,
  },
});

todoSchema.plugin(mongoosePaginate);

export const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);
