import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import routerApp from "./router";
import { format } from "date-fns";
import moment from "moment/moment";
import path from "path";

const app = express();

app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

routerApp(app);
app.get("/", (req, res) => {
    res.send("hello word Nguyễn Hà Hữu");
});
app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "Router not found" });
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: err.message });
});

mongoose.connect(process.env.MONGODB_ATLATS, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once("open", () => {
    console.log("ConnectDb successfully");
    app.listen(8000, () => {
        console.log("I am running port 8000");
    });
});
