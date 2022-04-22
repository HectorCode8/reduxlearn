export const reduceReducers = (...reducers) => (state, action) => 
reducers.reduce((acc, el) => el(acc, action), state)

const initialFetching = { loading: 'idle', error: null }
export const makeFetchingReducer = actions => (state = initialFetching, action) => {
  switch(action.type) {
    case actions[0]:
      return { ...state, loading: 'pending' }
    case actions[1]:
      return { ...state, loading: 'succeeded' }
    case actions[2]:
      return { error: action.error, loading: 'rejected' }
    default:
      return state
  }
}

export const makeSetReducer = actions => (state = 'all', action) => {
    switch(action.type) {
      case actions[0]:
        return action.payload
      default:
        return state
    }
  }