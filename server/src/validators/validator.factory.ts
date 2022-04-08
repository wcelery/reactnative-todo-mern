import { NextFunction, Request, RequestHandler, Response } from "express";

import { oneOf, query, ValidationChain, validationResult } from "express-validator/check";
import { ResponseError } from "./errors.factory";

export class ValidatorFactory {
  private QUERY_MESSAGE = "Invalid todo status!";

  private todoQueryValidationRules = [
    query("search")
      .trim()
      .escape()
      .isLength({ max: 20 })
      .withMessage("Title can't be more than 20 chars!"),
    oneOf(
      [
        query("status").optional().trim().escape().equals("completed"),
        query("status").optional().trim().escape().equals("inprogress"),
        query("status").optional().trim().escape().equals("public"),
        query("status").optional().trim().escape().equals("private"),
      ],
      this.QUERY_MESSAGE
    ),
  ];

  setQueryValidationRules() {
    return this.todoQueryValidationRules;
  }

  setValidationRules(rules: ValidationChain[] | RequestHandler[]) {
    return rules;
  }

  // too much any, not safe??????????
  async errorHandler(
    method: (...rest: any[]) => Promise<any>,
    res: Response,
    ...params: any
  ) {
    try {
      return await method(...params);
    } catch (error) {
      const err = new ResponseError(res, error);
      err.buildInternalServerError().execute();
    }
  }

  validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    next();
  }
}
