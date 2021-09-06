import React, {useState, useRef} from 'react'
import './BottomBar.css'
import axios from 'axios'
import {FaTrash} from 'react-icons/fa'

function BottomBar(props) {

    const [showDelete, setShowDelete] = useState(false)
    const [mouseLeave, setMouseLeave] = useState(true)
    const ref = useRef()

    const createBoard = async () => {
        const newBoard = await axios.post('/boards', {title: ''})
        props.setBoards([...props.boards, newBoard.data])
    }

    const deleteBoard = () => {

        const handleDelete = async (id) => {
            await axios.delete(`/boards/${id}`);
            const newBoards = props.boards.filter( board => board._id !== id  )
            props.setBoards(newBoards)
        }

        const handleMouseLeaveClick = () => {
            if(mouseLeave) ref.current.addEventListener('click', setShowDelete(false))
        }

        return(
            <div ref = {ref} onClick = {handleMouseLeaveClick}  className = 'delete-board__wrapper' >
                <div onMouseEnter = {() => {setMouseLeave(false)}} onMouseLeave = {() => setMouseLeave(true)} className = 'delete-board'>
                    {props.boards.map( board => <div className = 'delete-board__item' > {board.title} <button onClick = {() => {handleDelete(board._id)}} ><FaTrash/></button> </div> )}
                </div>
            </div>
        )
    }

    return (
        <div className = 'bottom-bar'>
            <button onClick = {createBoard} className = 'bottom-bar__btn create' >CREATE BOARD</button>
            <button onClick = {() => setShowDelete(true)} className = 'bottom-bar__btn delete' >DELETE BOARD</button>
            {showDelete ? deleteBoard() : ''}
        </div>
    )
}

export default BottomBar
