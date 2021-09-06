import React, { useState, useEffect, useRef } from 'react'
import Note from '../Note'
import './board.css'
import axios from 'axios'
import AddNoteForm from './AddNoteForm'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function Board(props) {
    const { _id, title, } = props.board
    const [board, setBoard] = useState()
    const [boardTitle, setBoardTitle] = useState(title)
    const [noteTitle, setNoteTitle] = useState()
    const [test, setTest] = useState()
    const [draggable, setDraggable] = useState(true)
    const ref = useRef()

    const fetchNotes = async () => {
        const notes = await axios.get(`/boards/${_id}`)
        setTest(notes.data.content)
    }
    useEffect(() => {
        fetchNotes()
        setBoard(props.board)
    }, [])

    useEffect(() => {
        const patchBoard = async () => {
            test && await axios.patch(`/boards/createNote/${_id}`, { content: test })
        }
        //console.log(board.content)
        
        setTest(props.board.content)
        patchBoard()
        
    },[props.boards])

    // useEffect(() => {
    //     const patchBoard = async () => {
    //         await axios.patch(`/boards/createNote/${_id}`, { content: board.content })
    //     }
    //     patchBoard()
    // },[test] )

    useEffect(() => {
        const patchBoard = async () => {
            await axios.patch(`/boards/updateTitle/${_id}`, { title: board.title })
            await axios.patch(`/boards/createNote/${_id}`, { content: board.content })
        }

        const setNewBoards = async () => {
            const newBoards = await axios.get('/boards')
            props.setBoards(newBoards.data)
        }
        board && patchBoard()
        setNewBoards()
    }, [board])

    // useEffect(() => {
    //     console.log(board)
    //     setBoard(props.board)
    //     console.log(board)
    // },[props.boards])


    const createNote = async () => {

        const newNote = await axios.post('/notes', { title: noteTitle })
        const res = await axios.patch(`/boards/createNote/${_id}`, { content: [...test, newNote.data] })
        setTest([...test, newNote.data])
        setBoard({...board})
    }

    const deleteNote = async (id) => {
        const filteredNotes = test.filter(note => note._id !== id)
        await axios.patch(`/boards/createNote/${_id}`, { content: filteredNotes })
        setTest(filteredNotes)
    }

    const patchBoardTitle = (e) => {

        e.preventDefault()
        setBoard({ ...board, title: boardTitle })
    }

    const handleOnDragEnd = (result) => {
        console.log(result)

        if (!result.destination) return;
        if (result.source.draggableId !== result.destination.draggableId) {
            // const source = test.find(column => column.id == result.source.droppableId)
            // const dest = test.find(column => column.id == result.destination.droppableId)
            // const [removed] = source.data.splice(result.source.index, 1)
            // dest.data.splice(result.destination.index, 0, removed)
            // console.log(removed, dest, test[1])
            console.log('dupa')
        }

        else {
            const source = test
            const [reorderedItem] = source.splice(result.source.index, 1)
            source.splice(result.destination.index, 0, reorderedItem)
            // console.log(reorderedItem, source, board)
            setBoard({
                ...board, content: source
            })
            console.log(reorderedItem, source, board)
        }
    }





    const renderNotes = () => {
        return (
                    <Droppable droppableId={_id} key={_id} >
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                {test && test.map((note, index) => (
                                    <Draggable draggableId={note._id} index={index} key={note._id}>
                                        {provided => (
                                            <div {...provided.dragHandleProps} {...provided.draggableProps} ref={ draggable ? provided.innerRef : null}>
                                                <Note draggable = {draggable} setDraggable = {setDraggable} fetchNotes={fetchNotes} board={board} setBoard={setBoard} boardId={_id} boardTitle={boardTitle} deleteNote={deleteNote} note={note} />
                                            </div>
                                        )}
                                    </Draggable>
                                )

                                )}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            
        )
    }


    return (
        <div className='board' >
            <div className='boardInput'>
                <form onSubmit={e => patchBoardTitle(e)}>
                    <input placeholder='Board' onChange={(e) => { setBoardTitle(e.target.value) }} value={boardTitle} />
                </form>
            </div>
            {renderNotes()}
            <AddNoteForm noteTitle={noteTitle} setNoteTitle={setNoteTitle} createNote={createNote} />
        </div>
    )
}

export default Board
