import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import SortSelector from './SortSelector';

class PostsPage extends Component{
  constructor(props){
    super(props); 
    this.state = {
      sortby: 'new'
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render(){
    return(
      <Grid container>
        <Grid item xs={12}>
          <SortSelector onChange={this.handleChange} sortby={this.state.sortby} />
        </Grid>
      </Grid>      
    )
  }
}
export default PostsPage