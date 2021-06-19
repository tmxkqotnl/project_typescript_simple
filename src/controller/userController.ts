import { Request, Response, NextFunction } from "express";
import { getMongoManager } from "typeorm";
import { User } from "../entity/user";

const Signup = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = new User();
  const dbManager = getMongoManager("atlas");

  const email = req.body.email;
  const password = req.body.password;

  user.email = email;
  user.password = password;

  await dbManager.save(user);

  res.status(201).send();
};
const Login = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = new User();
  const dbManager = getMongoManager("atlas");

  const email = req.body.email;
  const password = req.body.passsword;

  const rdata = await dbManager.findOne(User, { email });
  console.log(rdata);

  res.status(201).send();
};

export default { Login, Signup };
