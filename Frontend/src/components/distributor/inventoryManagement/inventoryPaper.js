import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextInventory from './textInventory';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 10),
    height: 250
  },
}));

export default function InventoryPaper() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Add Product's Inventory
        </Typography>
        <Typography component="p">
            <TextInventory/>
        </Typography>
      </Paper>
    </div>
  );
}