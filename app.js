const notes = require('./notes');//this is an object with different properties
const yargs = require('yargs');
const valid = require('validator');
const chalk = require('chalk');


// const msg1=notes.getnotes();
// const msg2=notes.printnotes();
// console.log(msg1+"      "+msg2);

//Checking validator module
// console.log(valid.isEmail("dvatsa77@gmail.com"));
// console.log(valid.isEmail("dharesh.com")); 
// console.log(valid.isURL("www.amazon.com"));
// console.log(valid.isURL("amazon.com"));

//Checking chalk module
// console.log(chalk.green("Success!!"));
// console.log(chalk.red.bgWhite.bold.underline.italic('Hello world!'));
// console.log(chalk.red.bgWhite.inverse("Hello"));
// console.log(chalk.black.bgGreen("Completed"));
// console.log("Checking nodemon");


//customising yargs version
yargs.version("1.1.0");

//In notes app,users should be able to add,remove,read and list data

//create add command
yargs.command({ //yargs take 4 options- command ,description, builder and handler
    command: 'add', //to check for the command entered by the user
    describe: 'Add a new note', //will provide a description to the user
    builder: { //builer will contain the elements of the note
        //essentially it contains the elements which build up the note
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) //this will be the function which will be carried out after a note is added
    {
        notes.addnote(argv.title, argv.body);
    }
});

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
});

//create list command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function () {
        console.log("List down the notes");
    }
});

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a  note',
    handler: function () {
        console.log("Read a note");
    }
});

yargs.parse();