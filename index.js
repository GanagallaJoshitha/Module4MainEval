import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {supabase} from "./config/supabase.js";
import userRoutes from "./routes/user.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import tripRoutes from "./routes/trip.routes.js";

import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", async(req, res)=>{
    const {data,error} = await supabase.from("users").select("*")
    if(error) return 
    res.status(500).json({error:error.message})
    res.json(data)
})

app.use("/users",userRoutes);
app.use("/vehicles",vehicleRoutes);
app.use("/trips",tripRoutes);
app.use(notFound);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})