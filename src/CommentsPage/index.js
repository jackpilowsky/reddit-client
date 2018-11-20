import React, { Component, Fragment } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Client from '../Client'
import SortSelector from '../shared/SortSelector';
import CommentsList from './CommentsList';

const endpoints = [
  'best', 'top', 'new', 'controversial', 'old', 'random'
]

const styles = {
  container: {
    padding: 20
  },
  item: {
    marginBottom: 20
  }
}

class CommentsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      sortby: 'top',
      comments: []
    }
  }
  componentDidMount(){
    this.fetchComments();
  }
  componentDidUpdate(prevProps, PrevState){
    if(PrevState.sortby !== this.state.sortby){
      this.fetchComments() 
    }
  }
  fetchComments(){
    const {post} = this.props
    const options = {
      depth: 5, 
      sort: this.state.sortby
    }
    Client.getComments(post.data.subreddit, post.data.id, options, results=>{
      this.setState({
        comments: (results[1] ? results[1].data.children : [])
      })
    })
  }


  handleChange = event => {
    this.setState({ sortby: event.target.value });
  };
  render(){
    const {classes} = this.props;
    return(
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.item}>
          <Button variant="contained" color="primary" onClick={this.props.unselectPost}>
            Go Back
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <SortSelector 
            endpoints={endpoints} 
            onChange={this.handleChange.bind(this)} 
            sortby={this.state.sortby} 
            />
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <CommentsList comments={this.state.comments}  
            />
        </Grid>

      </Grid>
    )
  }
}
export default withStyles(styles)(CommentsPage);