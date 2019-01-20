const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOption = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOption
    })
    .command('remove', 'Remove a note', {
        title: titleOption
    })
    .help()
    .argv;
let command = argv._[0];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Add succeed');
        notes.logNote(note);
    } else {
        console.log('This note has already existed');
    }

} else if (command === 'list') {
    let allNotes = notes.getAll();
    
    console.log(`Printing ${allNotes.length} note(s). `);
    allNotes.forEach(note => notes.logNote(note) );
} else if (command === 'read') {
    let note = notes.getNote(argv.title);

    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }

} else if (command === 'remove') {
    let isRemoved = notes.removeNote(argv.title);
    let message = isRemoved ? 'Note was removed' : 'Note not found';
    
    console.log(message);
    
} else {
    console.log('Command not recognized');
}