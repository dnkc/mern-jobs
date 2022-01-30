import express from "express";

//middleware
import notFoundMiddleware from "./middleware/NotFound.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
