const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

 //now we dont want fetch but search users
 export const searchUsers = async (text) => {

    const  params = new URLSearchParams({
        q:text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        },
    }) 

    const { items } = await response.json()
    
    //instead of set we want to use dispatch, to dispatch an action to our reducer
    return items
}
