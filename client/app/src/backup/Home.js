import React, {useState, useEffect} from 'react'
import './Home.css'
import Board from '../components/board/Board'
import axios from 'axios'
import BottomBar from '../components/BottomBar/BottomBar'

function Home() {
    const [boards, setBoards] = useState([])

   

    useEffect(() => {
        const fetchBoards = async () => {
            const boards = await axios.get('/boards')
            console.log(boards.data)
            setBoards(boards.data)
        }
        fetchBoards()
    }, [])

    

    const renderBoards = () => {
        return <div className = 'boards__wrapper'>
            {boards.map(board => <Board boards = {boards} setBoards = {setBoards} board = {board}/>)}
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
