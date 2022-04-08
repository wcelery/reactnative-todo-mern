interface IResponse {
  status(status: number): any;
  send(data: any): any;
}

export class ResponseError {
  error = {
    status: 0,
    error: {},
    message: "",
  };
  constructor(private response: IResponse, private errorObj?: any) {}

  buildInternalServerError() {
    this.error = {
      status: 500,
      error: this.errorObj,
      message: "INTERNAL SERVER ERROR",
    };
    // console.log(this.errorObj?.message || this.errorObj);
    return this;
  }

  buildNotFoundServerError() {
    this.error = {
      status: 404,
      error: {},
      message: "Not Found",
    };
    return this;
  }

  execute() {
    return this.response.status(this.error.status).send(this.error);
  }
}
