import { Router, Response } from "express";
import Request from "../../types/Request";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  "/register",
  async (_: Request, res: Response) => {
    res.send("Add registration logic there");
  }
);

export default router;
