import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

export const testAdd = (req, res) => {
  console.log(req.body.cat);
  res.json(req.body);
}

export const addItem = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO items (name, id_category, id_subcategory, id_color, id_origin, id_set, id_cut, description, price, sale_price, weight, video, id_treatment, id_clarity, id_availability, id_is_onsale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
        req.body.description,
        req.body.price,
        req.body.saleprice,
        req.body.weight,
        req.body.video,
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
  } catch (err) {
    console.error(err);
  }
}

export const addImgs = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request =
      "INSERT INTO images (id_item, img) VALUES (?, ?)";
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
  } catch (err) {
    console.error(err);
  }
}

export const addCertificate = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = "UPDATE items SET certificate = ? WHERE id = ?";
    connection.execute(
      request,
      [req.body.imgUrl, req.body.item_id],
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
  } catch (err) {
    console.error(err);
  }
};

export const deleteImg = (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    const request = "DELETE FROM images WHER id = ?";
    connection.execute(
      request,
      [req.body.id],
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
  } catch (err) {
    console.error(err);
  }
};
