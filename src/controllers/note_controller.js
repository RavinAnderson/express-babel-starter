import Note from '../models/note';

export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (id) => {
  // to quote Prof. Cormen: left as an exercise to the reader
  // remember to return the mongoose function you use rather than just delete
  return Note.deleteOne({ _id: id });
};

export const createNote = async (fields) => {
  // you know the drill. create a new Note mongoose object
  // return .save()
  const note = new Note();
  note.title = fields;
  note.x = 400;
  note.y = 12;
  note.zIndex = 1;
  note.content = '';
  const newNote = await note.save();
  return newNote;
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
