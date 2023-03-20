import React,{useEffect,useState} from 'react'
import { Link,useParams } from 'react-router-dom';
import axios from '../../axios'
import './ViewNote.css'

function ViewNote() {
    const [data,setData] = useState([])
    const {id} = useParams()
    useEffect(()=>{
        axios.get(`api/v1/notes/${id}`).then((res)=>{
            console.log(res.data);
            setData(res.data)
        })
    },[])
  return (
    <div className="view-note">
        <div className="view-note-card">
        <Link to='/'>
        <span class="material-symbols-outlined">
            arrow_back_ios_new
        </span>
        </Link>
            <div className="view-note-title">
                <h3>{data.title}</h3>
            </div>
            <div className="view-note-body">
                <p>{data.body}</p>
            </div>
        </div>
    </div>
  )
}

export default ViewNote