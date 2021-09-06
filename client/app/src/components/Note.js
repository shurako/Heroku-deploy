import React, {useState, useEffect} from 'react'
import './Note.css'
import axios from 'axios'
import NoteDetails from './NoteDetails'
import {FaTrash} from 'react-icons/fa'
import { Draggable } from 'react-beautiful-dnd'


function Note(props) {
    const {_id, title, description } = props.note
    const [note, setNote] = useState()
    const [showDetails, setShowDetails] = useState(false)
    const [noteDesc, setNoteDesc] = useState('')

// ***** EFFECTS

    useEffect(() => {
        setNote(props.note);
        setNoteDesc(props.note.description)

    }, [])

    useEffect(() => {
        const patchNote = async () => {
            const notes = await axios.get(`boards/${props.boardId}`)
            const updatedNotes = notes.data.content.map( item => {
            if(item._id == note._id) { return note}
            else return item
        } )
        await axios.patch(`/boards/createNote/${props.boardId}`, {content : updatedNotes})
        }
        
       note && patchNote()
    }, [note])


    

    useEffect(() => {
        if(showDetails) {props.setDraggable(false)}
        else{props.setDraggable(true)}
    },[showDetails])

    //**** FUNCTIONS
    const  handleShowDetails = () => {
        
        if(showDetails === true) return <NoteDetails  fetchNotes = {props.fetchNotes} noteDesc ={noteDesc} setNoteDesc = {setNoteDesc} handlePatchDescription = {handlePatchDescription} boardId = {props.boardId} showDetails = {showDetails} setShowDetails = {setShowDetails} boardTitle = {props.boardTitle} setNote = {setNote} note = {note} />
    }
    const handlePatchDescription = async (e) => {
        e.preventDefault()
        const notes = await axios.get(`boards/${props.boardId}`)
        const updatedNotes = notes.data.content.map( item => {
            if(item._id == note._id) { setNote({...note, description: noteDesc}); return {...note, description: noteDesc}}
            else return item
        } )
    }
   
    
    return (
        <div  className = 'note'>
            <div   className = 'note__content'>
                <p onClick = {() => setShowDetails(!showDetails)}>{title}</p>
                <button onClick = {() => {props.deleteNote(_id)}} ><FaTrash/></button>
            </div>

            {showDetails ? handleShowDetails() : ''}
            

        </div>
    )
}

export default Note
