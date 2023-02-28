import * as api from '../api/index';
import * as actionTypes from '../constants/actionTypes'

export const getPosts = (posts) =>{
    return{
        type: actionTypes.FETCH_ALL,
        payload: posts
    }
}

export const startLoading = () =>{
    return{ 
        type: actionTypes.START_LOADING,
    }
}
export const endLoading = () =>{
    return{ 
        type: actionTypes.END_LOADING,
    }
}

export const fetchPosts = (page) =>{
    return dispatch=>{
        dispatch(startLoading())

        api.fetchPosts(page)
        .then(res=>{
            dispatch(getPosts(res.data))
            dispatch(endLoading())
        })
        .catch(error=>{
            console.log(error.response.message)
        })

    }
}

export const searchPost = (posts) =>{
    return{
        type: actionTypes.SEARH_POST,
        payload: posts
    }
}

export const getPostBySearch = (searchQuery) =>{
    return dispatch=>{
        dispatch(startLoading())

        api.fetchPostsBySearch(searchQuery)
        .then(res=>{
                const { data } = res.data
                dispatch(searchPost(data))
                dispatch(endLoading())
            })
            .catch(error=>{
                console.log(error)
            })

    }
}

export const createPost = (post) =>{
    return{
        type: actionTypes.CREATE, 
        payload: post
    }
}
export const uplaodPosts = (data) =>{
    return dispatch=>{
        
        api.createPost(data)
        .then(res=>{
            dispatch(createPost(res.data))
        })
        .catch(error=> console.log(error.response))
        
    }
}


export const updatePost =  (updatedPost) =>{
    return{
        type: actionTypes.UPDATE,
        payload: updatedPost
    }
}

export const onUpdatePost = (id, post) =>{
    return dispatch=>{        
        api.updatePost(id, post)
        .then(res=>{
                dispatch(updatePost(res.data))
            })
        .catch(error=> console.log(error.message))
            
        }
    }
    
    
    export const dPost = (id) =>{
    return{
        type: actionTypes.DELETE,
        payload: id
    }
}
export const deletePost = (id) =>{
    return dispatch=>{
        api.deletePost(id)
            .then(res=>{
                dispatch(dPost(id))
            })
            .catch(err=> console.log(err.message))
    }
}


export const likePost = (data) =>{
    return{
        type: actionTypes.LIKE,
        payload: data
    }
}
export const likedPost = (id) =>{
    return dispatch=>{
        api.likePost(id)
            .then(res=>{
                dispatch(likePost(res.data))
            })
            .catch(error=> { console.log(error) })
    }
}