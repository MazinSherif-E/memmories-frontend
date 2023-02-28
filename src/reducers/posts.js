import * as actionTypes from '../constants/actionTypes';

const reducer = (state={ posts: [], isLoading: true }, action)=>{ 
    switch(action.type) {
        case actionTypes.START_LOADING:
            return { ...state, isLoading: true}
        case actionTypes.END_LOADING:
            return { ...state, isLoading: false}
        case actionTypes.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case actionTypes.CREATE:
            return { ...state , posts: [ ...state.posts, action.payload ]};

        case actionTypes.UPDATE:
        case actionTypes.LIKE:                
            return { ...state, posts: state.posts.map(post=> post._id === action.payload._id ? action.payload : post)}
        
        case actionTypes.DELETE: 
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)}
    
        case actionTypes.SEARH_POST:
            return { ...state, posts: action.payload } 
        default:


            return state;
    }
}

export default reducer;