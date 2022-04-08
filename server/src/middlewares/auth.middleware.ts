import passport from "passport";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import * as bcrypt from "bcryptjs";
import config from "config";

import { IUser, User } from "../models";

export class AuthMiddleware {
  useLocalStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          session: false,
        },
        async (username, password, done) => {
          const user = await User.findOne({ email: username });

          if (!user) return done(null, false);

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      )
    );
  }

  useJWTStrategy() {
    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.get("jwtSecret"),
        },
        async (jwt_payload, done) => {
          const user = await User.findOne({ _id: jwt_payload.sub });

          if (!user) return done(null, false);

          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      )
    );
  }

  authWithLocalStrategy() {
    return passport.authenticate("local");
  }

  authWithJWTStrategy() {
    return passport.authenticate("jwt");
  }

  serializeUser() {
    passport.serializeUser(function (
      user: IUser,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) {
      done(null, user);
    });
  }

  deserializeUser() {
    passport.deserializeUser(function (
      user: IUser,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) {
      done(null, user);
    });
  }
}
