import App from "./server";
import { createConnection, Connection, getConnection } from "typeorm"; // if there are more DB sources then change to createConnections

const start = async () => {
  try {
    const app: App = new App();
    const DBConnection: Connection = await createConnection({
      name: "atlas",
      type: "mongodb",
      url: process.env.MONGO_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
      entities: ["./src/entity/*.*"],
    });
    console.log("DB is Connected... ");
  } catch (error) {
    console.error("Error is occured when starting server... \n", error);
  }
};

start();
