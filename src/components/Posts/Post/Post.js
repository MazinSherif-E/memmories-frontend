import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

const Post = (props) =>{
    const data = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles();

    const Likes = () =>{
        if(data){
            if(props.post.likes.length > 0 && data.user ) {
                return props.post.likes.find(like=> like === data.user._id) ? (
                    <div >
                        <ThumbUpAltIcon fontSize='small'/> &nbsp;{props.post.likes.length > 2 ? `You an ${props.post.likes.length - 1} others` : `${props.post.likes.length} like${props.post.likes.length > 1 ? 's': ''}`}
                    </div>
                ) : (
                    <div>
                        <ThumbUpAltIcon fontSize='small'/> &nbsp;{props.post.likes.length} {props.post.likes.length === 1? 'Like' : 'Likes'}
                    </div>
                )
            }
        }
        return <div> <ThumbUpAltIcon fontSize='small'/> &nbsp;Like </div>
    }

    return(
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={props.post.selectedFile} title={props.post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{props.post.name}</Typography>
                <Typography variant="body2">{moment(props.post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
            {data && data.user._id === props.post.creator &&
                <Button style={{color: 'white'}} size="small" onClick={()=> props.setCurrentId(props.post._id)}>
                    <MoreHorizIcon fontSize="default"/>
                </Button>
            }
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{props.post.tags.map(tag=>`#${tag} `)}</Typography>
            </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{props.post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{props.post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}> 
                <Button size="small" color="primary" disabled={!data} onClick={()=> {props.onLikePost(props.post._id)}}>
                    <Likes/>
                </Button>
                {data && data.user._id === props.post.creator &&
                    <Button size="small" color="primary" onClick={()=> {props.onDeletePost(props.post._id)}}>
                        <DeleteIcon size="small"/>
                        Delete
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

const mapStateToProps = state =>{
    return{
        posts: state.posts,
        data: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onDeletePost: (id)=> dispatch(actions.deletePost(id)),
        onLikePost: (id)=> dispatch(actions.likedPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);