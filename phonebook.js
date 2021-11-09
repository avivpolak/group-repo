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
    const id = Number(request.params.id);
    const person = data.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});
app.get("/info", (request, response) => {
    const date = new Date();
    response.send(
        `Phonebook has info for ${Object.entries(data).length} people ,${date}`
    );
});
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    data = data.filter((person) => person.id !== id);
    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        });
    }
    if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        });
    }
    if (isExsists(body.name)) {
        return response.status(400).json({
            error: "name already exsists",
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomIntInclusive(0, 999999999999),
    };

    data = data.concat(person);

    response.json(data);
});
app.use("/", express.static(path.join(__dirname, "/dist"))); // serve main path as static dir
app.get("/", function (req, res) {
    // serve main path as static file
    res.sendFile(path.join(__dirname, "/dist/phonebook.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function isExsists(name) {
    for (let person of data) {
        if (person.name === name) {
            return true;
        }
    }
    return false;
}
