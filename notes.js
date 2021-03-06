//this file will be exported
// console.log("notes is exported");
// const obj={
//     getnotes:function () {aaaaa
//     return "Your Notes....";
// },
//     printnotes:function()
//     {
//         return "The notes are printed";
//     }
// }

const fs = require('fs');
const chalk = require('chalk');
const getnotes = () => {
    return "Your Notes.....";
}


const addnote = (title, body) => {
    const notes = loadnotes();
    const duplicateNotes = notes.filter(function (note) { //duplicatenotes array will have 0 items if no duplicate titles were found
        return note.title === title;//filter automatically traverses the entire array and this function gets called one time for each note
    })
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.black.bgGreen("Note successfully added"));
    }
    else {
        console.log(chalk.black.bgRed("Note Title already present"));
    }
}

const removeNote = (title) => {
    const notes = loadnotes();
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    })
    if (notesToKeep.length === notes.length)
        console.log(chalk.black.bgRed("No note found"));
    else if (notesToKeep.length < notes.length)
        console.log(chalk.black.bgGreen("Note successfully removed"));
    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadnotes();
    console.log(chalk.green.inverse("Your notes-"));
    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadnotes()
    const rnote = notes.find((note) => {
        return note.title === title
    })
    if (rnote === undefined)
        console.log(chalk.red.inverse("No note found with this title"));
    else {
        console.log(chalk.green.inverse(rnote.title));
        console.log(chalk.inverse(rnote.body));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadnotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

module.exports = {
    getnotes: getnotes,
    addnote: addnote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};