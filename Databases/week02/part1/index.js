//The README file in this folder describes how to run this file.
const express = require("express");
const mysql = require("mysql2");

const newWorldDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fooCoding321",
  database: "new_world",
});

// Connect to MySQL;
newWorldDB.connect((err) => {
  if (err) {
    throw err;
  }
});

const app = express();

//What is the capital of country X ?
newWorldDB.prepare(
  "SELECT country.Name as 'country', city.Name as 'capital' from country inner join city on country.Capital = city.ID where country.Name = ?",
  (err, statement) => {
    app.get("/1/:id", (req, res) => {
      statement.execute([req.params.id], (error, result) => {
        if (result.length === 0) {
          res.send({ error: "Please try another country" });
        } else {
          res.send(result);
        }
      });
    });
  }
);

//List all the languages spoken in the region Y
newWorldDB.prepare(
  "SELECT distinct l.Language as 'languages' from country c inner join countrylanguage l on c.Code = l.CountryCode where c.Region = ?",
  (err, statement) => {
    app.get("/2/:id", (req, res) => {
      statement.execute([req.params.id], (error, result) => {
        res.send(result);
      });
    });
  }
);

//Find the number of cities in which language Z is spoken
newWorldDB.prepare(
  "SELECT count(distinct c.Name) as 'cities' from city c inner join countrylanguage l on c.CountryCode = l.CountryCode where l.Language = ?",
  (err, statement) => {
    app.get("/3/:id", (req, res) => {
      statement.execute([req.params.id], (error, result) => {
        res.send(result);
      });
    });
  }
);

//List all the continents with the number of languages spoken in each continent
newWorldDB.prepare(
  "SELECT c.Continent, count(distinct l.Language) as languages from country c inner join countrylanguage l on c.Code = l.CountryCode group by c.Continent",
  (err, statement) => {
    app.get("/4", (req, res) => {
      statement.execute([], (error, result) => {
        res.send(result);
      });
    });
  }
);

//For the country given as input, is there any countries that have the same official language is in the same continent
newWorldDB.prepare(
  "SELECT count(*) as count from country c1 inner join country c2 on c1.Continent = c2.Continent inner join countrylanguage l1 ON c1.Code = l1.CountryCode inner join countrylanguage l2 on c2.Code = l2.CountryCode where c1.Name = ? and l1.IsOfficial = 'T' and l2.IsOfficial = 'T' and l1.Language = l2.Language",
  (err, statement) => {
    app.get("/5/:id", (req, res) => {
      statement.execute([req.params.id], (error, result) => {
        if (result[0].count > 1) {
          newWorldDB.prepare(
            "SELECT distinct c2.Name as country from country c1 inner join country c2 on c1.Continent = c2.Continent inner join countrylanguage l1 on c1.Code = l1.CountryCode inner join countrylanguage l2 ON c2.Code = l2.CountryCode WHERE c1.Name = ? AND l1.IsOfficial = 'T' AND l2.IsOfficial = 'T' AND l1.Language = l2.Language",
            (err, statement) => {
              statement.execute([req.params.id], (error, result) => {
                res.send(result);
              });
            }
          );
        } else {
          res.send("FALSE");
        }
      });
    });
  }
);

// Run server
const server = app.listen("4000");

process.on("SIGTERM", () => {
  server.close();
  newWorldDB.end();
});
