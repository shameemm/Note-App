import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { useParams , useNavigate, Link } from 'react-router-dom'
import './EditNote.css'

function EditNote() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const data1 = {
        title:title,
        body:content
    }
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get(`api/v1/notes/${id}`).then((res)=>{
            setData(res.data);
            setContent(res.data.body)
            setTitle(res.data.title)
        })
    },[])
    const editNotes = async (e)=>{
        e.preventDefault()
        await axios.put(`api/v1/notes/${id}/ `, data1).then((res)=>{
            console.log(res.data);
            navigate('/')

        })
    }
    console.log(data);
    console.log(data1);
  return (
    <div className='edit-note'>
        <Link to='/'>
        <span class="material-symbols-outlined">
            arrow_back_ios_new
        </span>
        </Link>
        <div className="edit-note-form">
            <form action="">
            <input type="text" value={title} required onChange={(e)=>{setTitle(e.target.value)}} name="" id="" placeholder="Note Title" />
            <textarea name="" required defaultValue={content} onChange={(e)=>{setContent(e.target.value)}} id=""  cols="30" rows="10" placeholder="Note Content"></textarea>
            <button onClick={editNotes} >Update Note</button>
            </form>
        </div>
    </div>
  )
}

export default EditNote