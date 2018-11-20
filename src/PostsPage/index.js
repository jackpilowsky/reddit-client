import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import SortSelector from './SortSelector';

class PostsPage extends Component{
  render(){
    return(
      <Grid container>
        <Grid item xs={12}>
          <SortSelector />
        </Grid>
      </Grid>      
    )
  }
}
export default PostsPage