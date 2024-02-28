import React from 'react';
import { useState, useEffect } from "react";
import Note from './Note';
import Plus from './Icons/plus';
import EditNote from './EditNote';


export default function Main() {
    const [notes, setNotes] = useState([]);
    const [deleteData, setDeleteData] = useState("");
    const [displayConfirmDel, setDisplayConfirmDel] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingNote, setEditingNote] = useState({});

    const handleDeleteData = (data) => {
        setDeleteData(data);
        setDisplayConfirmDel(true);
    }

    const handleStopEdit = () => {
        setIsEditing(false);
    }

    const handleUpdateStop = (data) => {
        setNotes(data);
        setIsEditing(false);
    }

    const handleMaximize = (data) => {
        setEditingNote(data);
        setIsEditing(true);
    }

    const handleNewNoteMade = (data) => {
        setNotes(data);
    }

    const deleteNoteFromBackend = async () => {
        try {
            const response = await fetch(`/api/delNotes/${deleteData[0]}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const updatedNotes = await response.json();
            setNotes(updatedNotes);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    
    
    const fetchNotes = () => {
        fetch("/api/notes")
        .then(response => response.json())
        .then(json => {
            setNotes(json);
        })
        .catch(error => console.error('Error fetching notes:', error));
    }
    useEffect(()=>{
        fetchNotes();
    }, []);
  return (
    <div className=' w-screen h-screen flex flex-col items-center gap-8'>
        <header className='text-2xl font-semibold mt-4 font-kadwa-bold'>Notes</header>
        { !isEditing && <main className='w-full h-4/6 flex flex-row flex-wrap justify-center gap-4 overflow-y-auto'>
            {notes.length > 0 && 
            notes.map((note, index) => {
                return <Note id={note._id} title={note.title} body={note.body} key={index} receiveData={handleDeleteData} receiveMaximize={handleMaximize}/>
            })}
        </main>
        }
        {!isEditing && <Plus styling="fixed bottom-2 left-1/2 -translate-x-1/2 hover:rotate-90 duration-700" receiveData={handleNewNoteMade}/>
        }

        {isEditing && <EditNote curNote={editingNote} stopEdit={handleStopEdit} updateStop={handleUpdateStop}/>}
        {/* confirmation box */}
        {displayConfirmDel && <div className='absolute bg-EEF0EB top-1/2 left-1/2 w-1/2 sm:w-3/12 h-32 sm:h-36 rounded-md -translate-x-1/2 -translate-y-1/2 confirm-shadow
        flex flex-col items-center justify-start gap-2 sm:gap-4'>
            <div className='w-full h-1/6 '>
                <button className='w-4 h-4 mt-1 ml-1 absolute bg-E84855 rounded-full' onClick={()=>{setDisplayConfirmDel(false)}}></button>
            </div>
            
            <h3 className='w-full text-center font-semibold'>Do you want to Delete? <span className='font-bold text-FE4A49'>{deleteData[1]}</span></h3>
            <button className='bg-04080F text-white w-16 h-6 rounded-sm font-semibold' onClick={()=>{deleteNoteFromBackend(); setDisplayConfirmDel(false)}}>Yes</button>
        </div>}
    </div>
  )
}
