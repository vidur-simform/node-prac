const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command:"add",
    describe:"Command for adding notes",
    builder:{
        title:{
            describe:"Add your note title",
            demandOption:true,
            type: 'string'
        }
        ,
        body:{
            describe:"Add your note body",
            demandOption:true,
            type: 'string'
        }
    },
    handler:function(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//removing command
yargs.command({
    command:"remove",
    describe:"Command for removing notes",
    builder:{
        title:{
            describe:"Add your note title",
            demandOption:true,
            type: 'string'
        }
    },
    handler:function(argv){
        notes.removeNote(argv.title);
    }
});

//reading note
yargs.command({
    command:"read",
    describe:"Command for reading notes",
    builder:{
        title:{
            describe:"Add your note title",
            demandOption:true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

//listing note
yargs.command({
    command:"list",
    describe:"Command for reading notes",
    handler(){
        notes.listNotes();
    }
});

yargs.parse();