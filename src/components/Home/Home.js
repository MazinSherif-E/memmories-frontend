import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import Pagination from '../Pagination';
import * as actions from '../../actions/index';
import { styled } from '@mui/material/styles';

import Chip from '@mui/material/Chip';

function useQuery() { 
    return new URLSearchParams(useLocation().search) 
}

const Home = (props) => {
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])

    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const ListItem = styled('ul')(({ theme }) => ({
        padding: theme.spacing(.2),
      }));

    const searchPost = () =>{
        if(search.trim() || tags){
            const newArray = tags ? tags.map(tag => tag.tag) : []
            props.getSearchPost({ search, tags: newArray.join(',')})
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${newArray.join(',')}`)
        } else{
            history.push('/')
        }
    }
    
    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){
            searchPost();
        }
    }
    
    const handleKeyPressTags = (e) =>{
        if(e.keyCode === 13 && tag !== ''){
            setTags([ ...tags, { id: uuidv1() ,tag: tag} ]) 
            setTag('')
        }
    }


    const handleDelete = (id) => () => {
        setTags(tags.filter(tag => tag.id !== id))
    }

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid className={classes.gridContainer} container justify="space-between" alignItems='stretch' spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search" 
                            variant='outlined' 
                            label="Search Memories" 
                            fullWidth
                            value={search}
                            onKeyDown={handleKeyPress}
                            onChange={(e)=>{setSearch(e.target.value)}}
                            autoComplete='off'
                        />
                        <TextField 
                            name="searchTags" 
                            variant='outlined' 
                            label="Search Tags" 
                            fullWidth
                            value={tag}
                            onKeyDown={handleKeyPressTags}
                            onChange={(e)=>{setTag(e.target.value)}}
                            style={{ margin: '10px 0'}} 
                            autoComplete='off'
                        />
                        { tags.length === 0 ? null : 
                            <ListItem>
                                {tags.map(item=>(
                                    <Chip 
                                        key={item.id}
                                        label={item.tag}
                                        onDelete={handleDelete(item.id)} 
                                        style={{ margin: '1px 2px'}} 
                                    />
                                ))}
                            </ListItem>
                        }
                        <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6} className={classes.pagination}>
                        <Pagination page={page}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchPosts:()=> dispatch(actions.fetchPosts()),
        getSearchPost:(searchQuery)=> dispatch(actions.getPostBySearch(searchQuery))
    }
}
export default connect(null, mapDispatchToProps)(Home); 