import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

const endpoints = [
  'new', 'hot', 'random', 'top' 
];


class SortSelector extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="sortby">Sort By</InputLabel>
          <Select
            value={this.props.sortby}
            onChange={this.props.handleChange}
            inputProps={{
              name: 'sortby',
              id: 'sortby',
            }}
          >
            {
              endpoints.map(endpoint =>{
                return (
                  <MenuItem value={endpoint} key={endpoint}>{endpoint}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </form>
    );
  }
}

SortSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortSelector);
