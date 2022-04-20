import {combineReducers} from 'redux'

export const setPending = () => ({type: 'todos/setPending'})
export const setFulfilled = payload => ({ type: 'todos/fulfilled', payload })
export const setError = e => ({ type: 'todos/error', error: e.message })
export const setComplete = (payload) => ({type: 'todo/complete', payload})
export const setFilter = payload => ({type: 'filter/set', payload})

export const fetchThunk = () => async (dispatch) => {
    dispatch(setPending())
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      const todos = data.slice(0, 10)
      dispatch(setFulfilled(todos))
    } catch(e){
      dispatch(setError())
    }
  }


  export const filterReducer = (state = 'all', action) => {
    switch(action.type) {
      case 'filter/set':
        return action.payload
      default:
        return state
    }
  }
  
const initialFetching = { loading: 'idle', error: null }
const fetchingReducer = (state = initialFetching, action) => {
  switch(action.type) {
    case 'todos/pending':
      return { ...state, loading: 'pending' }
    case 'todos/fulfilled':
      return { ...state, loading: 'succeeded' }
    case 'todos/error':
      return { error: action.error, loading: 'rejected' }
    default:
      return state
  }
}
  
export const todosReducer = (state = [], action) => {
  switch(action.type) {
    case 'todos/fulfilled': {
      return action.payload
    }
    case 'todo/add':
      const id = Math.random().toString(36)
      return state.concat({ id, ...action.payload })

    case 'todo/complete':
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed }
        }

        return todo
      })
    default:
      return state
  }
}
  
  export const reducer = combineReducers({
    todos: combineReducers({
      entities: todosReducer,
      status: fetchingReducer,
    }),
    filter: filterReducer,
  })

export const selectTodos = state => {
    const {todos: {entities}, filter} = state
  
    if(filter === 'complete') {
      return entities.filter(todo => todo.completed)
    }
  
    if(filter === 'incomplete') {
      return entities.filter(todo => !todo.completed)
    }
    return entities
  }
  
  
export const selectStatus = state => state.todos.status