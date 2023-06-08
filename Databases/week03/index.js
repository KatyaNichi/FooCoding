///Documentation is in README.MD file
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fooCoding321",
  database: "todo",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connection succeeded");
});

//display all users
app.get("/", (req, res) => {
  const sql = "SELECT firstname, lastName, userId FROM user";
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// display all lists from the database
app.get("/lists", (req, res) => {
  const sql = `SELECT * FROM todolist`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json({
        result,
      });
    }
  });
});

// display all items
app.get("/items", (req, res) => {
  connection.query("SELECT * FROM todoitem", (err, result) => {
    if (err) {
      res.status(500).json({
        status: "!OK",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json({
        result,
      });
      return;
    }
  });
});

// create todo item
app.post("/:listId/create-item", (req, res) => {
  const itemName = req.body.itemName;
  const isCompleted = req.body.isCompleted;
  const listId = req.params.listId;

  if (typeof isCompleted !== "boolean") {
    console.error("Wrong type of input");
    res.status(400).send("Wrong type of input");
    return;
  }

  const sql = `INSERT INTO todoitem(itemName, isCompleted, listId) VALUES (?, ?, ?)`;
  connection.query(sql, [itemName, isCompleted, listId], (err, _result) => {
    if (err) {
      res.status(500).json({
        status: "Error",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json({
        itemName: itemName,
        isCompleted: isCompleted,
        listId: listId,
      });
      return;
    }
  });
});

// delete todo item
app.delete("/delete/item", (req, res) => {
  const itemID = req.body.itemID;

  connection.query(
    "DELETE FROM todoitem WHERE itemID = ?",
    itemID,
    (err, result) => {
      if (err) {
        res.status(500).json({
          status: "!OK",
          message: "Something went wrong",
        });
        console.log(err);
      } else {
        res.status(200).send();
        console.log("Deleted item with id: ", itemID);
        return;
      }
    }
  );
});

//create a new todo list for a specific user
app.post("/:userId/create", (req, res) => {
  const listName = req.body.listName;
  const reminder = req.body.reminder;
  const userId = req.params.userId;

  const sql = `INSERT INTO todolist (listName, userID, reminder) VALUES (?, ?, ?)`;
  connection.query(sql, [listName, userId, reminder], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      const insertedId = result.insertId;
      res.status(200).json({
        listId: insertedId,
        listName: listName,
        userId: userId,
        reminder: reminder,
      });
      console.log("Created todo");
    }
  });
});

// delete todolist
app.delete("/delete", (req, res) => {
  const listId = req.body.listId;

  connection.query(
    "DELETE FROM todoitem WHERE listId = ?",
    [listId],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
        });
        console.log(err);
      } else {
        connection.query(
          "DELETE FROM todolist WHERE listId = ?",
          [listId],
          (err, result) => {
            if (err) {
              res.status(500).json({
                message: "Something went wrong",
              });
              console.log(err);
            } else {
              res.status(200).send();
              console.log(
                "List and associated items are deleted: listId",
                listId
              );
              return;
            }
          }
        );
      }
    }
  );
});

// update the status (isCompleted) and/or name (itemName) of a todo item.
app.put("/update/item", (req, res) => {
  const itemID = req.body.itemID;
  const isCompleted = req.body.isCompleted;
  const itemName = req.body.itemName;

  let sql = "UPDATE todoitem SET";
  const values = [];

  if (isCompleted !== undefined) {
    sql += " isCompleted = ?";
    values.push(isCompleted);
  }

  if (itemName !== undefined) {
    sql += " itemName = ?";
    values.push(itemName);
  }

  sql += " WHERE itemID = ?";
  values.push(itemID);

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "!OK",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json({
        isCompleted,
        itemName,
        itemID,
      });
      console.log("Item updated with ID:", itemID);
      return;
    }
  });
});

// Add reminder to list
app.put("/add-reminder-to-list", (req, res) => {
  const listId = req.body.listId;
  const reminder = req.body.reminder;

  connection.query(
    "UPDATE todolist SET reminder = ? WHERE listId = ?",
    [reminder, listId],
    (err, result) => {
      if (err) {
        res.status(500).json({
          status: "!OK",
          message: "Something went wrong",
        });
        console.log(err);
      } else {
        res.status(200).json({
          listId,
          reminder,
        });
        console.log("Reminder added to list with ID:", listId);
      }
    }
  );
});

///////////////////////////////// MORE FEATURES /////////////////////////////
// add new user
app.post("/users", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName || null;
  const lastName = req.body.lastName || null;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required fields.",
    });
    return;
  }
  connection.query(
    "INSERT INTO user (email, password, firstName, lastName) VALUES (?, ?, ?, ?)",
    [email, password, firstName, lastName],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
        });
        console.log(err);
        return;
      }

      res.status(200).json({
        message: "User added successfully.",
        user_id: result.insertId,
      });
    }
  );
});

// Add a tag to list

app.post("/add/tag", (req, res) => {
  const listID = req.body.listID;
  const tagName = req.body.tagName;

  connection.query(
    "INSERT INTO tag (tagName) VALUES (?)",
    [tagName],
    (err, result) => {
      if (err) {
        res.status(500).json({
          status: "!OK",
          message: "Something went wrong",
        });
        console.log(err);
      } else {
        const tagID = result.insertId;

        connection.query(
          "INSERT INTO taglist (listID, tagID) VALUES (?, ?)",
          [listID, tagID],
          (err, result) => {
            if (err) {
              res.status(500).json({
                status: "!OK",
                message: "Something went wrong",
              });
              console.log(err);
            } else {
              res.status(200).json({
                status: "OK",
                message: "Tag added to list",
                listID: listID,
                tagID: tagID,
              });
              console.log("Tag added to list with ID:", listID);
              return;
            }
          }
        );
      }
    }
  );
});

app.listen(4000, () => {
  console.log(`Starts port 4000`);
});
