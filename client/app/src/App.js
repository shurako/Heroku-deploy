import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Home from './pages/Home'
import Note from './components/Note'
import Header from './components/header/Header';
import Test from './pages/Test';


function App() {
  const [notes, setNotes] = useState()
 

  const handleClick = async () => {
   await axios.post('http://localhost:3001/notes', {
    title: 'Hello',
  
  })
  console.log('send')
  }

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get('http://localhost:3001/notes')
      return data.data
    }
    
    const setData = async () => {
      const data = await getData()
      setNotes(data)

    }

    setData()
    

  }, [])
  
  

  return (
    <div className="App">
      <Header/>
      <Home/>
      <Test/>
    </div>
  );
}

export default App;
