import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); // Jo data aata hai usko json form me convert karta hai yeh command.

dotenv.config(); // Since port is a sensitve info so we keep it in a hidden file .env and to acces port from there we write this code.
const PORT = process.env.PORT || 3000;

// Connect to MongoDb
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDb");
} catch (error) {
  console.log("Error :", error);
}

// Defining routes



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
