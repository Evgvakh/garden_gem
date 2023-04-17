import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

export const testAdd = (req, res) => {
  console.log(req.body.cat);
  res.json(req.body);
}

export const addItem = (req, res) => {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO items (name, id_category, id_subcategory, id_color, id_origin, id_set, id_cut, id_treatment, id_clarity, id_availability, id_is_onsale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.execute(
      request,
      [
        req.body.name,
        req.body.cat,
        req.body.subcat,
        req.body.color,
        req.body.origin,
        req.body.set,
        req.body.cut,
        req.body.treatment,
        req.body.clarity,
        req.body.avail,
        req.body.sale
      ],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results.insertId
          });
        }
      }
    );    
}

export const addImgs = (req, res) => {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO images (id_item, url) VALUES (?, ?)";
    connection.execute(
      request,
      [
        req.body.item_id,
        req.body.imgUrl
      ],
      function (err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            Message: results,
          });
        }
      }
    );  
}
