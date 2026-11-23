import express, { Application, Request, Response } from "express";
import { initDB} from "./db";
import { userRouter } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

 

initDB();

app.get("/", (req: Request, res: Response) => {
//   console.log(req);
  res.status(200).json({
    success: true,
    message: "This Is Root Route",
    athor: "ISRAN",
  });
});

app.use("/api/v1/users", userRouter)
app.use("/api/v1/profiles", profileRoute)
app.use("/api/v1/auth", authRouter)



// Get Users

app.get("/api/v1/users", userRouter)

// get single Users
app.get("/api/v1/users/:id", userRouter);

//Put | update 
app.put("/api/v1/users/:id", userRouter);

app.delete("/api/v1/users/:id", userRouter)


export default app