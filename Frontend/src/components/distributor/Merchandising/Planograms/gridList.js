import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {ganttchart} from './images/ganttchart.PNG';
import {milestone} from './images/milestone.PNG';
import {multitenant} from './images/multitenant.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function GridListFunc() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <img src={ganttchart}/>
        </Grid>
        <Grid item xs>
        <img src={milestone}/>
        </Grid>
        <Grid item xs>
        <img src={multitenant}/>
        </Grid>
      </Grid>            
    </div>
  );
}