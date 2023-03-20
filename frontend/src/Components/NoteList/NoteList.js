import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Link} from 'react-router-dom'
import './NoteList.css'
import swal from 'sweetalert';
import InputNote from '../InputNote/InputNote';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function NoteList() {
  const [open, setOpen] = React.useState(false);
  const [data,setData] = useState([])
  const [count,setCount] = useState(0)
  useEffect(()=>{
    axios.get('api/v1/notes').then((res)=>{
      setData(res.data)
      setCount(res.data.length)
    })
  },[count,open])
  const navigate = useNavigate()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const viewNote = (id)=>{

  }
  const deleteNote = (id) => {
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this note!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`api/v1/notes/${id}`).then((res)=>{
          console.log(res);
          setCount((count)=>--count)
        })
        swal("Poof! Your note has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your note is safe!");
      }
    });
    
  }
  return (
    <div className='note-list'>
        <Card  sx={{ minWidth: 300,maxWidth:350 }}>
          <div className="note-head"> 
            <div className="note-heading">
                <h2>Notes</h2>
            </div>
            <div className="add-note">
            <Button onClick={handleOpen}>Add Note</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <InputNote handleClose={handleClose}/>
              </Box>
            </Modal>
            </div>
          </div>
            <div className="note-list-body">
              {data.map((note)=>
                <div className="note-card">
                    
                    <div className="note-body">
                    <div className="note-titile">
                        {note.title}
                    </div>
                      <div className="note-buttons">
                        <Link to={`/view-note/${note.id}`}>
                        <span class="material-symbols-outlined">
                          visibility
                        </span></Link>
                      <span class="material-symbols-outlined" onClick={()=>deleteNote(note.id)}>
                        delete
                      </span>
                      <Link to={`/edit-note/${note.id}`}>
                      <span class="material-symbols-outlined">
                        
                        edit
                      </span>
                      </Link>
                      </div>
                      
                    </div>
                </div>
              )}
            </div>
        </Card>
    </div>
  )
}

export default NoteList