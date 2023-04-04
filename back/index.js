import express from "express";
import multer from "multer";
import cors from "cors";

import {
  getAllItems,
  getAllGemsByCat,
  getOneGem,
  getCategories,
  getCarouselItems,
} from "./controllers/itemsController.js";

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());
app.use("/uploads/img", express.static("uploads/img"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("img"), (req, res) => {
  res.json({
    url: `uploads/img/${req.file.originalname}`,
  });
});

app.post("/gems", getAllItems);
app.get("/gemscarousel", getCarouselItems);
app.get("/gems/:id", getAllGemsByCat);
app.get("/collection/:id", getOneGem);
app.get("/cats", getCategories);

app.listen(port, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});