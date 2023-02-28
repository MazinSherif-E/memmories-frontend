import React, { useEffect } from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/index'

const Paginate = (props) =>{
    const classes = useStyles();
    const { numberOfPages } = props.numberOfPages

    useEffect(()=>{
        if(props.page) props.onFetchPosts(props.page)
    }, [props.page, numberOfPages])

    return(
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(props.page)}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem { ...item } component={Link} to={`/posts?page=${item.page}`}/>
            )}         
        />
    )
}

const mapStateToProps = state =>{
    return{
        numberOfPages: state.posts,
        
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchPosts:(page)=> dispatch(actions.fetchPosts(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);