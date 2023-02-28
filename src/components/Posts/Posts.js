import React, { useEffect } from 'react';
import Post from './Post/Post.js'
import useStyles from './styles';
import { connect } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const Posts = props =>{
    const classes = useStyles();
    const { posts } = props.posts
    const { isLoading } = props.posts

    if(!posts.length && !isLoading) return (<Typography variant="h6"> No Posts </Typography>)

    return(
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map(post=>(
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={props.setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

const mapStateToProps = state =>{
    return{
        posts: state.posts
    }
}
export default connect(mapStateToProps)(Posts);