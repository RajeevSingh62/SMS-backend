import express from "express";
import cors from "cors";
import routes from "./routes";


export const app=express();

app.use(express.json());
app.use(cors());


//Mainroutes
app.use("/api",routes);
app.get("/",(req,res)=>{
    res.send("Api is running....")
})
