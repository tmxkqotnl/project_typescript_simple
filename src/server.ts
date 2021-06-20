import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import dotenv from "dotenv";
import nunjucks from "nunjucks";
import morgan from "morgan";
import path from "path";
import indexRouter from "./routes/indexRoute";
import userRouter from "./routes/userRoute";
import boardRouter from "./routes/boardRoute";

class App {
  public server: express.Application;
  private dotEnv: dotenv.DotenvConfigOutput;

  constructor() {
    this.server = express();
    this.dotEnv = dotenv.config();

    this.server.use(
      process.env.NODE_ENV === "dev" ? morgan("dev") : morgan("combined")
    );
    this.server.set("view engine", "html");
    nunjucks.configure("./src/views", {
      express: this.server,
      watch: true,
    });

    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, "public")));
    this.server.use("/user", express.static(path.join(__dirname, "public")));
    this.server.use("/", indexRouter);
    this.server.use("/user", userRouter);
    this.server.use("/board", boardRouter);

    this.server.set(
      "port",
      process.env.NODE_ENV === "dev" ? process.env.PORT : 3000
    );

    this.server.listen(this.server.get("port"), () => {
      console.log("listeing port " + this.server.get("port"));
    });

    this.server.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).render("error", {
        message: "PAGE NOT FOUND",
      });
    });

    this.server.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.error(err);
        res.send(err);
      }
    );
  }
}

export default App;
