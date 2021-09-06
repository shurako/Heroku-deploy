import React,{useState, useRef, useEffect} from 'react'
import { BsPlus } from 'react-icons/bs'


function AddNoteForm(props) {
    const [inputFocus, setInputFocus] = useState(false)
    const ref = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createNote()
        ref.current.reset()
        return false
    }


    return (
        <div>
            <form ref = {ref} onSubmit = { (e) => {handleSubmit(e); }  } className='add-card__form'>
                <div className='add-card__input__wrapper' >  
                    <BsPlus onClick = {() => ref.current.focus()}  />
                    <input  className='add-card__input' placeholder={'add card'} onChange={e => props.setNoteTitle(e.target.value)} />
                </div>
               {/* <div className = 'add-card__button__wrapper'>
                    <button className = 'add-card__btn add' onClick={props.createNote} >Add</button>
                    <button className = 'add-card__btn cancel'  >Cancel</button>
               </div> */}
            </form>
        </div>
    )
}

export default AddNoteForm
