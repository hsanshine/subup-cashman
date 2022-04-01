const notesTotal = (notesArray) => {
  const sum = notesArray.reduce((accumulator, currentNote) => {
    return accumulator + Number(currentNote.value) * Number(currentNote.qty);
  }, 0);
  return sum;
};

export default notesTotal;
