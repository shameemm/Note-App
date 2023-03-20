import './App.css';
import Grid from '@mui/material/Grid';
import InputNote from './Components/InputNote/InputNote';
import NoteList from './Components/NoteList/NoteList';
import {Routes,Route} from 'react-router-dom'
import ViewNote from './Components/ViewNote/ViewNote';
import EditNote from './Components/EditNote/EditNote';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<NoteList/>}></Route>
        <Route path='/view-note/:id' element={<ViewNote/>}></Route>
        <Route path='/edit-note/:id' element={<EditNote></EditNote>}></Route>
      </Routes>
    </div>
  );
}

export default App;
