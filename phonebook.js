const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const Person = require("./models/phonebook");
require("dotenv").config();
app.use(cors());
app.use(express.json());

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});

app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
            tokens.body(req, res),
        ].join(" ");
    })
);

app.get("/api/persons", (request, response) => {
    Person.find({}).then((person) => {
        console.log(person);
        response.json(person);
    });
});
app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id)
        .then((person) => {
            response.json(person);
        })
        .catch((error) => {
            response.status(404).send(error);
        });
});
app.get("/info", (request, response) => {
    const date = new Date();
    Person.count({}, function (err, count) {
        if (err) {
            response.status(404).send(err);
        }
        response.send(`Phonebook has info for ${count} people ,${date}`);
    });
});
app.delete("/api/persons/:id", (request, response) => {
    Person.deleteOne({ id: request.params.id }, function (err) {
        if (err) {
            return response.status(404).send(err);
        }
        response.send("deleted");
    });
});

app.post("/api/persons", (request, response) => {
    const { name, number } = request.body;
    if (!name) {
        return response.status(400).json({
            error: "name missing",
        });
    }
    if (!number) {
        return response.status(400).json({
            error: "number missing",
        });
    }
    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.send("saved");
        })
        .catch((error) => {
            if (error.code === 11000) {
                response.status(400).send("duplicated number");
            } else response.status(404).send(error);
        });
});
app.use("/", express.static(path.join(__dirname, "/dist"))); // serve main path as static dir
app.get("/", function (req, res) {
    // serve main path as static file
    res.sendFile(path.join(__dirname, "/dist/phonebook.html"));
});

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
