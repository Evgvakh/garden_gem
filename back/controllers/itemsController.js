import mysql from "mysql2";
import { dbParams } from "../DB/index.js";

async function getItemsWithImages(preparedReq, conn, id = null, lim = null, offs = null) {
  async function getItems() {
    let res = await new Promise((res, rej) =>
      conn.execute(preparedReq, [id], (err, results) =>
        err ? rej(err) : res(results)
      )
    );
    return res;
  }

  async function getImages() {
    let res = await new Promise((res, rej) =>
      conn.execute(`SELECT * FROM images`, (err, results) =>
        err ? rej(err) : res(results)
      )
    );
    return res;
  }

  const items = await getItems();
  const images = await getImages();
  
  items.map((item) => {
    let imgs = images.filter((img) => img.id_item === item.id);
    let newImgsArr = imgs.map((el) => {
      return el.img;
    });
    item.images = newImgsArr;
  });  

  return items;
}

export const getAllItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });
    console.log(req.body.params);
    const limit = req.body.params.limit;
    const offset = req.body.params.offset;
    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        
                        LIMIT ${limit} OFFSET ${offset}`;
    
    
    const items = await getItemsWithImages(request, connection);    
    res.json(items);
  } catch (err) {
    res.json(err);
  }
};

export const getCarouselItems = async (req, res) => {
  try {
    const connection = mysql.createConnection(dbParams);

    connection.connect(function (err) {
      if (err) {
        return console.error("Error: " + err.message);
      } else {
        console.log("Connected to DB");
      }
    });

    const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        LIMIT 15`
                        ;

    const items = await getItemsWithImages(request, connection);
    res.json(items);
  } catch (err) {
    res.json(err);
  }
};

export const getAllGemsByCat = async (req, res) => {
  const connection = mysql.createConnection(dbParams);

  connection.connect(function (err) {
    if (err) {
      return console.error("Error: " + err.message);
    } else {
      console.log("Connected to DB");
    }
  });

  const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        WHERE id_category = ?`;
  const id_cat = req.params.id;

  const items = await getItemsWithImages(request, connection, id_cat); 
  
  res.json(items);
};

export const getOneGem = async (req, res) => {
     const connection = mysql.createConnection(dbParams);

     connection.connect(function (err) {
       if (err) {
         return console.error("Error: " + err.message);
       } else {
         console.log("Connected to DB");
       }
     });

     const request = `SELECT items.*,                    
                        categories.name AS category,
                        colors.name AS color,
                        sets.name AS item_set,
                        cut.name AS cut,
                        origin.name AS origin,
                        clarity.name AS clarity,
                        treatment.name AS treatment
                        FROM items 
                        JOIN categories on items.id_category = categories.id
                        join colors on items.id_color = colors.id
                        join sets on items.id_set = sets.id
                        join cut on items.id_cut = cut.id
                        join origin on items.id_origin = origin.id
                        join clarity on items.id_clarity = clarity.id
                        join treatment on items.id_treatment = treatment.id
                        WHERE items.id = ?`;
    const id = req.params.id;
    const items = await getItemsWithImages(request, connection, id);
    res.json(items[0]);
}

export const getCategories = async (req, res) => {
    const connection = mysql.createConnection(dbParams);

     connection.connect(function (err) {
       if (err) {
         return console.error("Error: " + err.message);
       } else {
         console.log("Connected to DB");
       }
     });

    const request = `SELECT * FROM categories`;

     async function getItems() {
       let res = await new Promise((res, rej) =>
         connection.execute(request, (err, results) =>
           err ? rej(err) : res(results)
         )
       );
       return res;
    }
    
    const cats = await getItems();
    res.json(cats);
}