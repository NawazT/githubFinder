//for managing multiple states accross the app global context is used
//importing creat context hook
import { createContext,useReducer } from "react"
import githubReducer from "./GithubReducer"

//variable to store the context
const GithubContext = createContext()

//storing the needed env variables in local variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//provider function for conataining the states and the shared data

export const GithubProvider = ({children}) => {
    //create a variable to use the reducer inside the provider function
    // we have to create an initial state also
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    //from the reducer we get state and dispatch, defines what changes to make in which state
    const [state, dispatch] = useReducer(githubReducer,initialState)

    //initial users for testing purpose

   
    //get single user
    const getUser = async (login) => {
        setLoading()

        //end point we want to hit
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        }) 

        if(response.status === 404 ) {
            window.location = '/notfound'
        } 
        else {

            const data = await response.json()
        
            //instead of set we want to use dispatch, to dispatch an action to our reducer
            dispatch ({
                type:'GET_USER',//dispatch this type to the reducer
                payLoad: data, //data from the API
            })
        }    
    }

    //get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const  params = new URLSearchParams({
            sort:'created',
            per_page: 10,
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        }) 

        const data = await response.json()
        
        //instead of set we want to use dispatch, to dispatch an action to our reducer
        dispatch ({
            type:'GET_REPOS',//dispatch this type to the reducer
            payLoad: data, //data from the API
        })
    }

    const setLoading = () => dispatch({
        type: 'SET_LOADING',
    })

    const clearUsers = () => dispatch({
        type:'CLEAR_USERS',
    })
    //return the children with values equals the states
    return <GithubContext.Provider value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext