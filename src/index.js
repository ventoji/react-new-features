import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

const notesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_NOTES':
            return action.notes   
        case 'ADD_NOTE':
            return [...state,{title: action.title, body: action.body}]
        case 'REMOVE_NOTE':
            return state.filter((note) => note.title !== action.title) 
        default:
            return state;
    }
}

const NoteApp = () =>{
    //const notesData = JSON.parse(localStorage.getItem('notes'))
   // const [notes, setNotes] = useState(notesData || [])
   const [notes, dispatch] = useReducer(notesReducer,[])
  // const [notes, setNotes] = useState( [])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNote = (e) => {
        e.preventDefault()
        dispatch({type: 'ADD_NOTE', title, body})
        // setNotes([
        //     ...notes,
        //     { title, body }
        // ])
        setTitle('')
        setBody('')
    }
const removeNote = (title) => {
    dispatch({type: 'REMOVE_NOTE', title})
    //setNotes(notes.filter((note) => ( note.title !== title    )))
}
useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'))
    if(notes){
       dispatch({type: 'POPULATE_NOTES', notes})
       // setNotes(notesData)
    }
},[])

useEffect(() => {
    console.log('useEffect run')
    localStorage.setItem('notes', JSON.stringify(notes))
},[notes])

    return(
        <div> 
            <h1> Notes </h1>
            {notes.map((note) =>(
                <Note key={note.title} note={note} removeNote={removeNote} />
            ))}
            <p> Add Note </p>
            <form onSubmit={addNote}> 
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <br/>
                <textarea 
                placeholder="Add your note content here" 
                value={body} 
                onChange={ (e) => setBody(e.target.value)}> 
                </textarea>
                <br/>
                <button> add note</button>
            </form>
            </div>
    )
}

const Note = ({note, removeNote}) => {

    useEffect(() => {
        console.log('Setting up effect!')

        return () => {
            console.log('Cleaning up effect')
        }
    },[])
    return (
        <div > 
                <h3> {note.title}</h3> 
                <p>{note.body} </p>
                <button onClick={() => removeNote(note.title)}>x</button>
                </div>
    )
}
/* const App = (props) => {

    const [count , setCount] = useState(props.count)
    const [state, setState] = useState({
        count: props.count,
        text: ''
    })


    return (
        <div>
            <p> The current {state.text || 'count'}  is {state.count}</p>
            <button onClick={() => setState({count: state.count+1})}> +1</button>
            <button onClick={() => setState({count: state.count-11})}> -1</button>
            <button onClick={() => setState({ count: props.count})}> reset</button>
            <input value={state.text} onChange={(e) =>setState({text: e.target.value}) } /> 
        </div>
    )
} */
 const App = (props) => {

    const [count , setCount] = useState(props.count)
    const [text, setText] = useState('')
  

    useEffect(() => {
        console.log('useEffect run')
        document.title = count
    },[count]) 

    return (
        <div>
            <p> The current {text || 'count'}  is {count}</p>
            <button onClick={() => setCount(count+1)}> +1</button>
            <button onClick={() => setCount(count-1)}> -1</button>
            <button onClick={() => setCount(props.count)}> reset</button>
            <input value={text} onChange={(e) =>setText(e.target.value) } /> 
        </div>
    )
} 
 App.defaultProps={
    count: 0
} 
ReactDOM.render(<NoteApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
