/* eslint-disable default-case */
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
const initialState = {
  entities: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':{
      return {
        ...state,
        entities: [...state.entities.concat({...action.payload})]
      }
    }
    case 'todo/complete': {
      const  newTodos = state.entities.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, completed: !todo.completed}
        }

        return todo
      })
      return {
        ...state,
        entities: newTodos
      }
    }
  }
  return state
}

const TodoItem = ({todo}) => {
  return(
    <li>{todo.title}</li>
  )
}

const App = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const state = useSelector(x => x)
  

  const submit = e => {
    e.preventDefault()
    if(!value.trim()){
      return
    }
    const id = Math.random().toString(36)
    const todo = {title: value, completed: false, id }
    dispatch({type: 'ADD_TODO', payload: todo})
    setValue(' ')
  }
  return(
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </form>
      <button>Mostrar toDo</button>
      <button>Completado</button>
      <button>Incompletos</button>
      <ul>
        {state.entities.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      </ul>
    </div>
  )
}

export default App