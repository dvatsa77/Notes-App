// console.log("notes is exported");
// const obj={
//     getnotes:function () {
//     return "Your Notes....";
// },
//     printnotes:function()
//     {
//         return "The notes are printed";
//     }
// }

const fs = require('fs');
const getnotes = function () {
    return "Your Notes....";
}

const addnote = function (title, body) {
    const notes=loadnotes();
    const duplicateNotes=notes.filter(function(note){ //duplicatenotes array will have 0 items if no duplicate titles were found
        return note.title===title;
    })

    if(duplicateNotes.length===0)
    {
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log('New Note added');
    }
    else
    {
        console.log("Note Title already present");
    }

    
    
}

const saveNotes=function(notes)
{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadnotes = function () {
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
    addnote: addnote
};