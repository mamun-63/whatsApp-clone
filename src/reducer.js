export const initialState = {
  user: null, 
}

// its just creating an object and set the user instead of direct dispatch the user
export const actionTypes = {
  SET_USER: "SET_USER",
}

const reducer = (state, action) => {
  console.log("action", action)

  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}

export default reducer