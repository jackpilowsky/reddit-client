import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles'
import SortSelector from '../shared/SortSelector';
import PostsList from './PostsList';
import Client from '../Client';

const styles = {
  grid: {
    padding: 20
  }
}
const endpoints = [
  'top','hot', 'rising', 'new', 'controversial', 'gilded' 
];

class PostsPage extends Component{
  constructor(props){
    super(props); 
    this.state = {
      sortby: 'hot',
      posts: [],
      after: null  // reddit API uses this for pagination
    };
  }
  componentDidMount(){
    Client.get(this.state.sortby, {},(results) =>{
      this.setState({
        posts: results.data.children,
        after: results.data.after
      })
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.sortby !== this.state.sortby){
      Client.get(this.state.sortby, {},(results) =>{
        if(results.data){
          this.setState({
            posts: results.data.children,
            after: results.data.after
          })
        }
      })
    }
  }
  handleClick(type){
    const options = {
      [type]: this.state[type]
    }
    Client.get(this.state.sortby,options,(results) =>{
      if(results.data){
        this.setState({
          posts: results.data.children,
          after: results.data.after
        })
      }
    })
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render(){
    const {classes} = this.props; 
    return(
      <Grid container>
        <Grid item xs={12} className={classes.grid}>
          <SortSelector 
            endpoints={endpoints}
            onChange={this.handleChange.bind(this)} 
            sortby={this.state.sortby} />
        </Grid>
        <Grid item xs={12} className={classes.grid}>
          <PostsList 
            posts={this.state.posts}
            selectPost={this.props.selectPost}
            handleClick={this.handleClick.bind(this)}
            after={this.state.after}
            before={this.state.before}
            />
        </Grid>
      </Grid>      
    )
  }
}
export default withStyles(styles)(PostsPage)