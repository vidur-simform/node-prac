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

yargs.parse();