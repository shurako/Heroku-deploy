import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'

function DescriptionForm(props) {

    const [description, setDescription] = useState()
    const ref = useRef()
    useEffect(() => {
        props.note.description && setDescription(props.note.description)
        ref.current.focus()
    }, [])


       

    return (
        <div >
            <form onSubmit={e => props.handlePatchDescription(e)}>
                <textarea ref = {ref}  onChange = {(e) => props.setNoteDesc(e.target.value)} value = {props.noteDesc} ></textarea>
                <button>dodaj</button>
            </form>
        </div>
    )
}

export default DescriptionForm
