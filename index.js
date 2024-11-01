import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { truncateSync } from "fs";


const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.render("index.ejs");
});

app.get("/about", (rreq, res) => {
    res.render("about.ejs");
});

app.post("/submit", async (req, res) => {
    try {
       const result = await axios.get(API_URL + req.body.artist + "/" + req.body.title);
       res.render("index.ejs", {lyrics: req.body.title + "\n" + req.body.artist + "\n\n" + result.data.lyrics});
    } catch (error){
        console.log(error);
        res.render("index.ejs", {lyrics: "Unable to search the lyrics based on this criteria."});
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});