import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OrdersSummaryByPercentage from './ordersSummaryByPercentage.js';
import IncomingPurchaseOrder from './incomingPurchaseOrder.js';
import OrdersShipment from './ordersShipment.js';

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

export default function PanelsChartGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs>
					<OrdersSummaryByPercentage />
				</Grid>
				<Grid item xs>
					<IncomingPurchaseOrder />
				</Grid>
				<Grid item xs>
					<OrdersShipment />
				</Grid>
			</Grid>
		</div>
	);
}
