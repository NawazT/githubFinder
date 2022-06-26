//reducer function takes two arg state and action
//helps manage states across components
const githubReducer = (state,action) => {
    switch(action.type) {
        case 'GET_USERS':
            return{//return whatevers already in the state and fil the users array with dta from the api
                ...state,
                users: action.payLoad,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default githubReducer