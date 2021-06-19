import { Request, Response, NextFunction } from "express";
import { getMongoManager } from "typeorm";
import { User } from "../entity/user";
import bcrypt from "bcrypt";

const validateAccount = (req:Request,res:Response, next:NextFunction)=> {
  const mailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const email = req.body.email;
  const password =req.body.password;
  if (!email.match(mailFormat)) return res.status(400).json({});
  if()
};
const validateString = (input: string): boolean => {
  if (typeof input !== "string" || (input as string).length === 0) {
    return false;
  }
  return true;
};

const Signup = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

  const user: User = new User();
  const dbManager = getMongoManager("atlas");
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
