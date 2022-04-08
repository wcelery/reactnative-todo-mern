import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import config from "config";

import { User, IUser } from "../models";

export class AuthService {
  async loginUser(credentials: IUser) {
    const secret = config.get<string>("jwtSecret");

    const expirationDate = config.get<number>("jwtExpiration");

    const user: IUser = await User.findOne({ email: credentials.email });

    const payload = {
      user: {
        email: user.email,
      },
    };

    const token = jwt.sign(payload, secret, {
      algorithm: "HS256",
      issuer: "wcelery",
      expiresIn: expirationDate,
      subject: String(user.id),
    });
    return { token };
  }

  async registerUser(credentials: IUser) {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const hashedUser = { ...credentials, password: hashedPassword };
    const user = await User.create(hashedUser);

    return user;
  }
}
