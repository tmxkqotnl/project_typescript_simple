import { Request, Response, NextFunction } from "express";
import { getMongoManager, MongoEntityManager } from "typeorm";
import { User } from "../entity/user";
import bcrypt from "bcrypt";

// atlas json setting & atlas index setting are required

const Signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = new User();
    const dbManager: MongoEntityManager = getMongoManager("local");
    const genSalt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(req.body.password, genSalt);

    user.email = req.body.email;
    user.password = hash;

    const newUser: User | undefined = await dbManager.save(user);

    res.status(201).json({
      user: newUser,
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "duplicate email",
        success: false,
      });
    }
    console.error("DB SAVE ERROR");
    console.error(error);
    res.status(500).json({
      message: "unexpected error",
      success: false,
    });
  }
};
const Singin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = new User();
    const dbManager: MongoEntityManager = getMongoManager("local");

    const email: string = req.body.email;
    const password: string = req.body.password;

    const rdata: User | undefined = await dbManager.findOne(User, { email });
    if (!rdata)
      return res.status(400).json({
        message: "check your email or password",
        success: false,
      });

    const result: boolean = await bcrypt.compare(password, rdata.password);

    if (!result) {
      return res.status(400).json({
        message: "check your email or password",
        success: false,
      });
    }
    res.status(201).json({
      success: true,
      isLoggedIn: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "unexpected error",
      success: false,
    });
  }
};

export default { Singin, Signup };
