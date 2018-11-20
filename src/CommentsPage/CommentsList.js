import React, { Fragment } from "react";
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Parser} from 'html-to-react';

const styles ={
  paper:{
    padding: 20,
    marginBottom: 10
  }
}

function CommentsList(props){
  const {classes} = props; 
  var parser = new Parser()
  return (
    <Fragment>
      {
        props.comments.map(comment =>{
          console.log(comment)
          const uniqueID = 't1_' + comment.data.id;
          return (
            <Paper key={uniqueID} className={classes.paper}>
              <Typography variant="h6">
                Author: u/{comment.data.author}
              </Typography>
              <Typography paragraph>
                {parser.parse(comment.data.body)}
              </Typography>
            </Paper>
          )
        })
      }
    </Fragment>
  )
}

export default withStyles(styles)(CommentsList);