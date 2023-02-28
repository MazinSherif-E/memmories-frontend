import axios from 'axios';
// mongodb+srv://Mazin:Mazin1234@cluster0.zlw6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// https://git.heroku.com/mazin-memories-app.git ,, https://mazin-memories-app.herokuapp.com
const API = axios.create({ baseURL: 'https://memories-server-side-mazin.onrender.com' })

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPosts = (page) => axios.get('http://localhost:5000/posts');
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signin = (formData) => API.post(`/user/signin`, formData);
export const signup = (formData) => API.post(`/user/signup`, formData);
export const getUser = () => API.get('/user/me');
export const logout = () => API.post('/user/logout');
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);