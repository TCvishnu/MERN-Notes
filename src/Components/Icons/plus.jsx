import React from 'react'

export default function Plus(props) {

  const createNewNote = async () => {
    try {
        const response = await fetch("/api/addNote", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedNotes = await response.json();
        sendNoteToMain(updatedNotes);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
  const sendNoteToMain = (data) => {
    props.receiveData(data);
  }

  return (
    <button className={props.styling} onClick={createNewNote}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    </button>
  )
}
