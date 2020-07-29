import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OverdueShipments from './overdueShipment.js';
import OverdueInvoices from './overdueInvoices.js';

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

export default function PanelsGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<OverdueShipments />
				</Grid>
				<Grid item xs={6}>
					<OverdueInvoices />
				</Grid>
			</Grid>
		</div>
	);
}
