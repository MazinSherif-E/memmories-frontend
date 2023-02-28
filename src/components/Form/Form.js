import React, { useState, useEffect } from 'react';
import useStyles from '../Home/styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../actions/index'
import { useHistory } from 'react-router-dom';


const Form = (props) =>{
    const data = JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = useState({
        title: '', message: '', selectedFile: '', tags:''
    })
    const post = props.currentId ? props.posts.find(post=> post._id === props.currentId) : null
    const classes = useStyles();
    const history = useHistory()

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(props.currentId){
            props.onAbdatePost(props.currentId, { ...postData, name: data.user.name})
        }else{
            props.onCreatePost({ ...postData, name: data.user.name})
            history.push('/')
        }
        clear();
    }

    const uploadImage = async (e) =>{
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setPostData({ ...postData, selectedFile: base64})
    }

    const convertBase64 = (file) =>{
        return new Promise((resolve, reject)=>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);

            fileReader.onload = ()=>{
                resolve(fileReader.result)
            }
            fileReader.onerror = (error)=>{
                reject(error)
            }
        })
    } 

    const clear = () =>{
        props.setCurrentId(null)
        setPostData({ title: '', message: '', selectedFile: '', tags:''})
    }


    return (
        <Paper className={classes.paper} elevation={6}>
            {data && data.user ? (
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{props.currentId ? 'Edit a Memory' : 'Creating a Memory'}</Typography>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={postData.title}
                        onChange={(e)=> setPostData({ ...postData, title: e.target.value})}/>
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        value={postData.message}
                        onChange={(e)=> setPostData({ ...postData, message: e.target.value})}/>
                    <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth
                        value={postData.tags}
                        onChange={(e)=> setPostData({ ...postData, tags: e.target.value.split(',')})}/>
                    <div className={classes.fileInput}>
                        <input type="file" onChange={(e)=>{uploadImage(e)}}/>
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form> 

            ): (
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories
                </Typography>            
            )}
        </Paper>
    );
}
const mapStateToProps = state =>{
    return{
        posts : state.posts.posts
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onCreatePost: (data)=> dispatch(actions.uplaodPosts(data)),
        onAbdatePost: (id, post)=> dispatch(actions.onUpdatePost(id, post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);