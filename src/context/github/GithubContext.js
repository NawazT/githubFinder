//for managing multiple states accross the app global context is used
//importing creat context hook
import { createContext,useState } from "react"

//variable to store the context
const GithubContext = createContext()

//storing the needed env variables in local variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//provider function for conataining the states and the shared data

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        }) 

        const data = await response.json()

        setUsers(data)
        setLoading(false)
    }

    //return the children with values equals the states
    return <GithubContext.Provider value={{
        users,
        loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext