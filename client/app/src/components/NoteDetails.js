import React, { useRef, useState, useEffect } from 'react'
import { GrNotes } from 'react-icons/gr'
import { GoNote } from 'react-icons/go'
import { VscGithubAction } from 'react-icons/vsc'
import axios from 'axios'
import DescriptionForm from './Note/DescriptionForm'
import NoteTitleForm from './Note/NoteTitleForm'
import { v4 as uuidv4 } from 'uuid';
import Comment from './Note/Comment'
import { useForm } from 'react-hook-form'


function NoteDetails(props) {

    const [mouseLeave, setMouseLeave] = useState(true)
    const [noteDescription, setNoteDescription] = useState()
    const [patchTitle, setPatchTitle] = useState(false)
    const [noteDescriptionFokus, setNoteDescriptionFokus] = useState(false)
    const [comment, setComment] = useState()
    const ref = useRef()
    const [file, setFile] = useState()


    //////// FUNCTIONS
    const onSubmit = async (e) => {
        e.preventDefault()
        let fd = new FormData()
        console.log(file)
        fd.append('file', file, file.name)

        const res = await axios.post('/upload', fd)
        props.setNote({ ...props.note, attachments: [...props.note.attachments, res.data.file.filename] })
    }

    const renderForm = () => {
        return (
            <form style={{ display: 'flex', marginTop: 4 }} onSubmit={onSubmit}>
                <input ref={ref} name='file' type='file' title="dsdsdsd" onChange={e => { setFile(e.target.files[0]); }} />
                <button type='submit' style={file ? { display: 'block' } : { display: 'none' }} > add file </button>

            </form>
        )
    }

    const renderAttachments = () => {

        const viewPhoto = (filePath) => {
            window.open('http://localhost:3001/file/image/' + filePath, '_blank')
        }

        return <div style={{ display: 'flex', marginLeft: 44, marginBottom: 8 }}>
            {props.note.attachments && props.note.attachments.map(filePath => <div onClick = {() => {viewPhoto(filePath)}} style={{ padding: 5, backgroundColor: '#fff', border: '1px solid black', marginRight: 4, borderRadius: 6 }} className='attachment__image__wrapper'> <img style={{ objectFit: 'contain', width: '50px', height: 'auto' }} src={'file/image/' + filePath} /> </div>)}
        </div>
    }

    useEffect(() => {
        if (props.note.comments === undefined) { props.setNote({ ...props.note, comments: [] }) }
        if (props.note.attachments === undefined) { props.setNote({ ...props.note, attachments: [] }) }
        console.log(props.note)


    }, [])

    const handleMouseLeaveClick = () => {
        if (mouseLeave) ref.current.addEventListener('click', props.setShowDetails(false))
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        props.setNote({ ...props.note, comments: [{ id: uuidv4(), content: comment, date: Date.now() }, ...props.note.comments] })
        ref.current.reset()
        return false
    }




    return (
        <div onClick={handleMouseLeaveClick} className='note-details'>
            <div onMouseEnter={() => { setMouseLeave(false) }} onMouseLeave={() => { setMouseLeave(true) }} className='note-details__wrapper'>
                <div>
                    <div className='note-details__top'>
                        <GrNotes className='note-details__icon' />
                        <div onClick={() => setPatchTitle(true)} className='note-details__header__wrapper'>
                            {patchTitle ? <NoteTitleForm fetchNotes={props.fetchNotes} setPatchTitle={setPatchTitle} note={props.note} setNote={props.setNote} /> : <h3 className='note-details__header'  >{props.note.title}</h3>}
                            <p>na liście: <span>{props.boardTitle}</span></p>
                        </div>
                    </div>
                    {renderAttachments()}
                    <div className='note-detaild__middle' >
                        <GoNote className='note-details__icon' />
                        <div className='note-details__details__wrapper' >
                            <h4>Opis</h4>
                            {renderForm()}
                            <div className='note-details__details__description'>
                                {noteDescriptionFokus ? <DescriptionForm noteDesc={props.noteDesc} setNoteDesc={props.setNoteDesc} handlePatchDescription={props.handlePatchDescription} note={props.note} description={props.note.description} setNoteDescription={setNoteDescription} boardId={props.boardId} _id={props.note._id} /> :

                                    <form >
                                        <textarea onClick={() => setNoteDescriptionFokus(true)} onChange={(e) => setNoteDescription(e.target.value)} value={props.noteDesc} />
                                    </form>}


                            </div>
                        </div>
                    </div>

                    <div className='note-details__bottom' >
                        <VscGithubAction className='note-details__icon' />
                        <div className='note-details__comments' >
                            <h4>Aktywność</h4>
                            <form ref={ref} onSubmit={(e) => { handleAddComment(e) }} >
                                <input onChange={(e) => { setComment(e.target.value) }} className='comment-input' placeholder='napisz komentarz' />
                            </form>

                        </div>


                    </div>


                    <div style={{ display: 'block' }}>
                        {props.note.comments && props.note.comments.map(comment => <Comment comment={comment} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NoteDetails
