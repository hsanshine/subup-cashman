import { createSlice } from "@reduxjs/toolkit";
import notesTotal from "../../utils/notesToCash";

//the notes can be pulled from outside
//the balance can be calculated from the notes
const NOTES = [
  {
    id: "20",
    value: 20,
    maxQty: 100,
    qty: 100,
  },
  {
    id: "50",
    value: 50,
    maxQty: 100,
    qty: 100,
  },
];
const initialState = {
  machineBalance: notesTotal(NOTES),
  notes: NOTES,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    intialize: (state, action) => {
      //   console.log(action);
      state.notes = action.payload.notes;
      state.machineBalance = action.payload.machineBalance;
    },
    updateMachineBalance: (state, action) => {
      const userNotes = action.payload.notes;
      const newNotes = state.notes.map((stateNote) => {
        const stateNoteId = stateNote.id; // this is the note object in state
        // if i have this object in my action aray too  i should  update it.. otherwise i should just return it untouched...
        const userNoteIndex = userNotes.findIndex(
          (userNote) => userNote.id === stateNoteId
        );
        if (userNoteIndex === -1) return stateNote;
        //the note in our state and needs to be updated with new max qty
        const userNote = userNotes[userNoteIndex];
        const qtyChange = userNote.qty;

        //const oldNote = state.notes[stateIndex];
        //return the updated state note
        return {
          ...stateNote,
          maxQty: action.payload.isDepositing
            ? Number(stateNote.maxQty) + Number(qtyChange)
            : Number(stateNote.maxQty) - Number(qtyChange),
        };
      });
      state.notes = newNotes;
      state.machineBalance = notesTotal(newNotes);
    },
  },
});

export const { intialize, updateMachineBalance } = adminSlice.actions;

export default adminSlice.reducer;
