import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleAppBar from '../../other/layouts/appBar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));
export default function PaymentForm() {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<SimpleAppBar />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
				<React.Fragment>
					<Typography variant="h6" gutterBottom>
						Payment method
			</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField required id="cardName" label="Name on card" fullWidth />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField required id="cardNumber" label="Card number" fullWidth />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField required id="expDate" label="Expiry date" fullWidth />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								id="cvv"
								label="CVV"
								helperText="Last three digits on signature strip"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox color="secondary" name="saveCard" value="yes" />}
								label="Remember credit card details for next time"
							/>
						</Grid>
					</Grid>
				</React.Fragment>
		

</Paper>
</main>
</React.Fragment >
	);
}
