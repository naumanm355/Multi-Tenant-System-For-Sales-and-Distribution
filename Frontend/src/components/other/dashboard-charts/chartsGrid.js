// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import RevenueChart from './revenueChart.js';
import ProfitChart from './profitChart.js';
import SoldUnitsChart from './soldUnitsChart.js';
import OrdersSummaryByPercentage from './ordersSummaryByPercentage.js';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		textAlign: 'center',
// 		color: theme.palette.text.secondary,
// 	},
// }));

// export default function ChartsGrid() {
// 	const classes = useStyles();

// 	return (
// 		<div className={classes.root}>
// 			<Grid container spacing={3}>
// 				<Grid item xs={3}>
// 					<RevenueChart />
// 					{/* <Paper className={classes.paper}>xs=3</Paper> */}
// 				</Grid>
// 				<Grid item xs={3}>
// 					<ProfitChart />
// 				</Grid>
// 				<Grid item xs={3}>
// 					<SoldUnitsChart />
// 				</Grid>
// 				<Grid item xs={3}>
// 					<OrdersSummaryByPercentage />
// 				</Grid>
// 			</Grid>
// 		</div>
// 	);
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop:80
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

export default function ChartsGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs>
					<RevenueChart />
				</Grid>
				<Grid item xs>
					<ProfitChart />
				</Grid>
				<Grid item xs>
					<SoldUnitsChart />
				</Grid>
			</Grid>
		</div>
	);
}
