const { default: chalk } = require('chalk');
const fs = require('fs');
// const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    //duplicate title
    const dup = notes.filter(note => title === note.title);
    if (dup.length == 0) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green("Note added successfully."));
    } else {
        console.log(chalk.red("Note with same title exist."));
    }
};

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

module.exports = { addNote };   //or addNote:addNote
