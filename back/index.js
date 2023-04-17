import express from "express";
import multer from "multer";
import cors from "cors";

import {
  getAllItems,
  getAllGemsByCat,
  getOneGem,
  getCarouselItems,
} from "./controllers/itemsController.js";

import { addImgs, addItem, testAdd } from "./controllers/adminController.js";
import {
  getCategories,
  getSubcats,
  getColors,
  getOrigins,
  getSets,
  getCuts,
  getTreatments,
  getClarities,
  getAvails,
  getSales
} from "./controllers/fetchDBFields.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads/img", express.static("uploads/img"));
app.use("/uploads/video", express.static("uploads/video"));
app.use("/uploads/certificates", express.static("uploads/certificates"));
app.use("/uploads/logo", express.static("uploads/logo"));

const storageImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/img');
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImg = multer({ storage: storageImg });

const storageCert = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/certificates');
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCert = multer({ storage: storageCert });

app.post("/upload/img", uploadImg.array("img"), (req, res) => {
  let imagesURLs = []
  for (let i of req.files) {
    imagesURLs.push(`uploads/img/${i.originalname}`);
  }
  res.json(imagesURLs);  
});

app.post("/upload/certs", uploadCert.single("certificate"), (req, res) => {  
  res.json({
    url: `uploads/certificates/${req.file.originalname}`,
  });
});

app.post('/admin/add', addItem);
app.post("/admin/addImgs", addImgs);
app.post("/admin/test", testAdd);

app.get("/gems", getAllItems);
app.get("/gemscarousel", getCarouselItems);
app.get("/gems/:id", getAllGemsByCat);
app.get("/collection/:id", getOneGem);

app.get("/cats", getCategories);
app.get("/subcats", getSubcats);
app.get("/colors", getColors);
app.get("/origins", getOrigins);
app.get("/sets", getSets);
app.get("/cuts", getCuts);
app.get("/treatments", getTreatments);
app.get("/clarities", getClarities);
app.get("/avails", getAvails);
app.get("/sales", getSales);

app.listen(8081, (err) => {
  if (err) {
    return console.log("SERVER DOWN");
  } else {
    return console.log("Server works");
  }
});
