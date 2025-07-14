import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

// Correct CORS configuration - allowing all origins
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome To MERN Stack APP");
});

app.use("/books", booksRoutes);

// Connect to MongoDB when the app starts
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

// Export the app for Vercel (remove app.listen())
export default app;
