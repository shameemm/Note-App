import React, { useState } from 'react'
import './InputNote.css'
import axios from '../../axios'
function InputNote({handleClose}) {
  const [ title, setTitle] = useState('')
  const [content,setContent] = useState('')
  const data = {
    title:title,
    body:content
  }  
  
  const addNote = async(e)=>{
    e.preventDefault()

    console.log(data);
    await axios.post('api/v1/notes/', data).then((res)=>{
      console.log(res);
      handleClose()
    })
  }
  return (
    <div className="add-note-form">
      <form action="">
        <input type="text" required value={title} onChange={(e)=>{setTitle(e.target.value)}} name="" id="" placeholder="Note Title" />
        <textarea name="" required id="" value={content} onChange={(e)=>{setContent(e.target.value)}} cols="30" rows="10" placeholder="Note Content"></textarea>
        <button onClick={addNote}>Add Note</button>
      </form>
    </div>
  )
}

export default InputNote