import express from "express";
import morgan from "morgan"
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from './config/dbConnect.js';
import userRoutes from './routes/userRoutes.js'
dotenv.config();
dbConnect();


const app = express()

//middleware
app.use(express.json());

app.use(morgan('dev'))
app.use(cors({ origin: '*' }))


//routes
app.use("/api/v1/users", userRoutes);


//login
app.use("/api/v1/users/login", userRoutes);

//register
app.use("/api/v1/users/register", userRoutes);






//listen server
const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`)); 

