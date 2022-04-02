import { createSlice } from "@reduxjs/toolkit";
import { notesTotal, adminNotesTotal } from "../../utils/notesToCash";

//the notes can be pulled from outside: they can come from the back end
//we should later late the admin be able to add a new kind of coin
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
      state.notes = action.payload.notes;
      state.machineBalance = adminNotesTotal(action.payload.notes);
    },
    updateMachineBalance: (state, action) => {
      const userNotes = action.payload.notes;
      const newNotes = state.notes.map((stateNote) => {
        const stateNoteId = stateNote.id;
        const userNoteIndex = userNotes.findIndex(
          (userNote) => userNote.id === stateNoteId
        );
        if (userNoteIndex === -1) return stateNote;
        const userNote = userNotes[userNoteIndex];
        const qtyChange = userNote.qty;
        return {
          ...stateNote,
          maxQty: action.payload.isDepositing
            ? Number(stateNote.maxQty) + Number(qtyChange)
            : Number(stateNote.maxQty) - Number(qtyChange),
        };
      });
      state.notes = newNotes;
      state.machineBalance = adminNotesTotal(state.notes);
    },
  },
});

export const { intialize, updateMachineBalance } = adminSlice.actions;

export default adminSlice.reducer;
