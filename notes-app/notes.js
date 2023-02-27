const fs = require('fs');
const chalk = require('chalk');

//add a note
const addNote = (title, body) => {
    const notes = loadNotes();

    //duplicate title not allowed
    const dup = notes.find(note => title === note.title);

    // debugger
    if (!dup) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green("Note added successfully."));
    } else {
        console.log(chalk.red("Note with same title exist."));
    }
};

//removing a note
const removeNote = (title) => {
    const notes = loadNotes();

    const remainingNotes = notes.filter((note) => note.title !== title);
    if (remainingNotes.length < notes.length) {
        saveNotes(remainingNotes);
        console.log(chalk.green("Note deleted successfully!"));
    } else {
        console.log(chalk.red("Note not found with given title."));
    }
};

//reading a note
const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.bold.inverse(note.title));
        console.log(note.body)
    } else {
        console.log(chalk.red("Note not found with given title!"));
    }
};

//listing notes
const listNotes = (title) => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes...'));
    notes.forEach(note => {
        console.log(chalk.bold(note.title) + " " + note.body);
    });
};

//loading notes from notes.json file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = dataBuffer.toString();
        const notes = JSON.parse(data);
        return notes;
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

module.exports = { addNote, removeNote, readNote, listNotes };   //or addNote:addNote
