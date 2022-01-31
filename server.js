import express from "express";
import dotenv from "dotenv";

//db and authenticate user
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobRoutes.js";
//middleware
import notFoundMiddleware from "./middleware/NotFound.js";
import errorHandlerMiddleware from "./middleware/ErrorHandler.js";

const app = express();

dotenv.config();
app.use(express.json());
import "express-async-errors";

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
