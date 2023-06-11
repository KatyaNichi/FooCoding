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
  const sql = "SELECT firstname, lastName, email, userId FROM user";
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

/// create todo item
app.post("/create-item", (req, res) => {
  const itemName = req.body.itemName;
  const isCompleted = req.body.isCompleted;
  const listId = req.body.listId; // Get listId from the request body

  if (typeof isCompleted !== "boolean") {
    console.error("Wrong type of input");
    res.status(400).send("Wrong type of input");
    return;
  }

  const sql = `INSERT INTO todoitem(itemName, isCompleted, listId) VALUES (?, ?, ?)`;
  const values = [itemName, isCompleted, listId];

  connection.execute(sql, values, (err, _result) => {
    if (err) {
      res.status(500).json({
        status: "Error",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      let completionStatus = isCompleted ? "completed" : "not completed";
      const message = `An item '${itemName}' was added to the list with ID ${listId} and it is ${completionStatus}.`;

      res.status(200).json({
        message: message,
      });
      return;
    }
  });
});

// delete todo item
app.delete("/delete/item/:itemID", (req, res) => {
  const itemID = req.params.itemID;

  const sql = "DELETE FROM todoitem WHERE itemID = ?";
  const values = [itemID];

  connection.execute(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "!OK",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).json({
        message: `Deleted item with id: ${itemID}`,
      });
      return;
    }
  });
});

/// create a new todo list
app.post("/create-list", (req, res) => {
  const listName = req.body.listName;
  const reminder = req.body.reminder;
  const userId = req.body.userId;

  const sql = `INSERT INTO todolist (listName, userID, reminder) VALUES (?, ?, ?)`;
  const values = [listName, userId, reminder || null];

  connection.execute(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    } else {
      let message = `List '${listName}' was successfully created for user with ID '${userId}'`;
      if (reminder) {
        message += ` with a reminder of "${reminder}"`;
      }
      res.status(200).send(message);
    }
  });
});

///delete list
app.delete("/delete/:listId", (req, res) => {
  const listId = req.params.listId;

  connection.query(
    "DELETE FROM todoitem WHERE listId = ?",
    [listId],
    (err, result) => {
      if (err) {
        res.status(500).send("Something went wrong");
        console.log(err);
      } else {
        connection.query(
          "DELETE FROM todolist WHERE listId = ?",
          [listId],
          (err, result) => {
            if (err) {
              res.status(500).send("Something went wrong");
              console.log(err);
            } else {
              res.status(200).send(`List with ID ${listId} is deleted`);
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

  let sql = "UPDATE todoitem SET ";
  const values = [];

  if (isCompleted !== undefined) {
    sql += "isCompleted = ?, ";
    values.push(isCompleted);
  }

  if (itemName !== undefined) {
    sql += "itemName = ?, ";
    values.push(itemName);
  }

  sql = sql.slice(0, -2);

  sql += " WHERE itemID = ?";
  values.push(itemID);

  connection.execute(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({
        status: "!OK",
        message: "Something went wrong",
      });
      console.log(err);
    } else {
      res.status(200).send(`Item with ID ${itemID} has been updated.`);
      return;
    }
  });
});

//set or change reminder
app.put("/add/reminder-to-list", (req, res) => {
  const listId = req.body.listId;
  const reminder = req.body.reminder;

  const selectSql = "SELECT reminder FROM todolist WHERE listId = ?";
  const selectValues = [listId];

  connection.execute(selectSql, selectValues, (selectErr, selectResult) => {
    if (selectErr) {
      res.status(500).json({
        status: "!OK",
        message: "Something went wrong",
      });
      console.log(selectErr);
      return;
    }

    if (selectResult.length === 0) {
      res.status(404).json({
        status: "!OK",
        message: "List not found",
      });
      return;
    }

    const existingReminder = selectResult[0].reminder;
    const updateSql = "UPDATE todolist SET reminder = ? WHERE listId = ?";
    const updateValues = [reminder, listId];

    connection.execute(updateSql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        res.status(500).json({
          status: "!OK",
          message: "Something went wrong",
        });
        console.log(updateErr);
        return;
      }

      if (existingReminder) {
        res
          .status(200)
          .send(
            `Reminder updated to "${reminder}" for list with ID: ${listId}`
          );
      } else {
        res.status(200).send(`Reminder added to list with ID: ${listId}`);
      }
    });
  });
});

///////////////////////////////// MORE FEATURES /////////////////////////////
// add new user
app.post("/users", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName || null;
  const lastName = req.body.lastName || null;

  if (!email || !password) {
    res.status(400).send("Email and password are required fields.");
    return;
  }

  const sql =
    "INSERT INTO user (email, password, firstName, lastName) VALUES (?, ?, ?, ?)";
  const values = [email, password, firstName, lastName];

  connection.execute(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Something went wrong");
      console.log(err);
      return;
    }

    res.status(200).send("User added successfully.");
  });
});

// Add a tag to list
app.post("/add/tag", (req, res) => {
  const listID = req.body.listID;
  const tagName = req.body.tagName;

  connection.execute(
    "INSERT INTO tag (tagName) VALUES (?)",
    [tagName],
    (err, tagResult) => {
      if (err) {
        res.status(500).send("Something went wrong");
        return;
      }

      const tagID = tagResult.insertId;

      connection.execute(
        "INSERT INTO taglist (listID, tagID) VALUES (?, ?)",
        [listID, tagID],
        (err, result) => {
          if (err) {
            res.status(500).send("Something went wrong");
            return;
          }

          res.status(200).send("Tag added to list");
        }
      );
    }
  );
});

app.listen(4000, () => {
  console.log(`Starts port 4000`);
});
