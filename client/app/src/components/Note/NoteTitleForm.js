import React from 'react'

function NoteTitleForm(props) {

    const handlePatchTitle = (e) => {
        props.setNote({...props.note, title: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setPatchTitle(false);
        props.fetchNotes();
        

    }
    return (
        <form onSubmit={handleSubmit} >
            <input className = 'note-title-form__input' onChange = {e => handlePatchTitle(e)} value = {props.note.title} />
        </form>
    )
}

export default NoteTitleForm
