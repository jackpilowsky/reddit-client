import React, { Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles'

const styles = {
  grid: {
    marginBottom: 20
  },
  paper: {
    padding: 20,
    overflow: 'hidden'
  },
  thumbnail: {
    float: 'left',
    marginRight: 10
  },
  a: {
    textDecoration: 'none'
  }
}

class PostLists extends Component{
  render(){
    const {classes} = this.props;
    return(
      <Fragment>
        {
          this.props.posts.map(listing =>{
            const {data} = listing; 
            const uniqueID = listing.kind + data.id; // this is the way reddit does its unique ids
            return (
              <Grid item className={classes.grid} key={uniqueID}>
                <a className={classes.a} href="javascript:void(0)" onClick={this.props.selectPost.bind(this, uniqueID)}>
                  <Paper className={classes.paper}>
                    {data.thumbnail !== 'self' && data.thumbnail !== 'default' &&
                      <img className={classes.thumbnail} src={data.thumbnail} alt={data.title} />
                    }
                    <Typography variant="body1" gutterBottom>
                      {data.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Number of comments: {data.num_comments}
                    </Typography>
                  </Paper>
                </a>
              </Grid>
            )
          })
        }
      </Fragment>
    )
  }
}
export default withStyles(styles)(PostLists)