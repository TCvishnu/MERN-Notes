import React from 'react';
import "./Styles.css";

export default function Note(props) {
    const sendIDToMain = () => {
        props.receiveData([props.id, props.title]);
    }

    const sendMaximizeData = () => {
        props.receiveMaximize(props);
    }
  return (
    <div className='w-5/12 h-60 bg-black sm:w-2/12 sm:h-4/6 rounded-xl flex flex-col gap-4 justify-start items-start note-shadow'>
        <div className='flex flex-row w-full gap-1 mt-2 ml-2'>
            <button className='w-4 h-4 bg-E84855 rounded-full' onClick={sendIDToMain}>

            </button>
            <button className='w-4 h-4 bg-EEB868 rounded-full' onClick={sendMaximizeData}>

            </button>
        </div>
        <div className='w-full h-5/6 flex flex-col gap-2'>
            <h2 className='text-white ml-2 font-kadwa-bold text-base'>{props.title}</h2>
            <div className='h-1 bg-white w-10/12 ml-2'></div>
            <p className='text-white ml-2 font-kadwa-regular text-sm'>{props.body}</p>
        </div>
    </div>
  )
}
