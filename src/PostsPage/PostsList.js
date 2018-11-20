import React, { Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  grid: {
    marginTop: 20
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
        <Grid item>
          {this.props.after &&
            <Button variant="contained" color="primary" onClick={this.props.handleClick.bind(this, 'after')}>
              Next
            </Button>
          }
        </Grid>
        {
          this.props.posts.map(listing =>{
            const {data} = listing; 
            const uniqueID = listing.kind + data.id; // this is the way reddit does its unique ids
            const isNSFW = data.whitelist_status === 'promo_adult_nsfw' || 
              data.parent_whitelist_status === 'promo_adult_nsfw' ||
              data.thumbnail === 'nsfw';
            return (
              <Fragment key={uniqueID}>
                {!isNSFW && /* I'm already setting the nsfw flag to 0 but some nsfw stuff not properly marked */
                  <Grid item className={classes.grid}>
                    <a className={classes.a} href="#" onClick={this.props.selectPost.bind(this, listing)}>
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
                }
              </Fragment>
            )
          })
        }
      </Fragment>
    )
  }
}
export default withStyles(styles)(PostLists)