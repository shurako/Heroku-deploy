import React, {useState, useEffect, useRef} from 'react'
import './Home.css'
import Board from '../components/board/Board'
import axios from 'axios'
import BottomBar from '../components/BottomBar/BottomBar'
import { DragDropContext } from 'react-beautiful-dnd'




function Home() {
    const [boards, setBoards] = useState([])
    const [operation, setOperation] = useState(true)
    const boardsRef = useRef()
    const fetchBoards = async () => {
        const boards = await axios.get('/boards')
        setBoards(boards.data)
    }
    
    

    useEffect(() => { 
        fetchBoards()
    }, [])




    const handleOnDragEnd =  async (result) => {
        console.log(result)

        if (!result.destination) return;
        
        if (result.source.droppableId !== result.destination.droppableId) {
            
            const sourceBoard = boards.find(board => board._id == result.source.droppableId)
            const destBoard = boards.find(board => board._id == result.destination.droppableId)

            const [removed] = sourceBoard.content.splice(result.source.index, 1);
            destBoard.content.splice(result.destination.index, 0, removed)

            setBoards([...boards])
        }

        else {
            const board = boards.find(board => board._id == result.source.droppableId)
            const source = board.content
            const [reorderedItem] = source.splice(result.source.index, 1)
            source.splice(result.destination.index, 0, reorderedItem)
            const newArray = boards.map( item => {
                if(board._id !== item._id) {return item}
                else{ return {...item, content : source} }
            }  )
            setBoards([...newArray])
        }
    }


    const renderBoards = () => {
        return <div  ref = {boardsRef} className = 'boards__wrapper'>
            <DragDropContext onDragEnd = {(result) => {handleOnDragEnd(result)}}>
                {boards.map(board => <Board boards = {boards} setBoards = {setBoards} board = {board}/>)}
            </DragDropContext>
        </div>
            
        
    }

    return (
        <div className = 'home'>
            {renderBoards()}
            <BottomBar boards = {boards} setBoards = {setBoards} />
        </div>
        
    )
}

export default Home
