import { ADDNOTE, DELETENOTE } from '../constants';

export const addNote = (data) => ({
    type: ADDNOTE,
    note: data,
});

export const deleteNote = (notekey) => ({
    type: DELETENOTE,
    key: notekey,
});