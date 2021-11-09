// const mongoose = require("mongoose");

// const password = process.argv[2];

// const url = `mongodb+srv://aviv:123@minigoogle.iisrf.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

// mongoose.connect(url);

// const noteSchema = new mongoose.Schema({
//     content: String,
//     date: Date,
//     important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// // const note = new Note({
// //     content: "HTML is Easy",
// //     date: new Date(),
// //     important: false,
// // });

// // note.save().then((result) => {
// //     console.log("note saved!");
// //     mongoose.connection.close();
// // });

// Note.find({ important: true }).then((result) => {
//     result.forEach((note) => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// });

const mongoose = require("mongoose");

if (process.argv.length < 5 && process.argv.length > 3) {
    console.log(
        "Please provide the password this arguments: node mongo.js <password> <name> <number>"
    );
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://aviv:${password}@minigoogle.iisrf.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: name,
    number: number,
});
if (process.argv[4] && process.argv[3]) {
    person.save().then((result) => {
        console.log(`person ${name} , with number ${number} saved!`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
