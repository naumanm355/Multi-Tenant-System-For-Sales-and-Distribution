import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Dashboard from '../dashboard/dashboard'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
		ul: {
			margin: 0,
			padding: 0,
		},
		li: {
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	reglink: {
		'text-decoration': 'none',
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor: theme.palette.grey[200],
	},

	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(3),
	},
}));

const tiers = [
	{
		title: 'Basic',
		price: '500',
		description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
		buttonText: 'Register',
		buttonVariant: 'outlined',
		backgroundcolor: '#38BC8B',
		colorr: '#38BC8B'
	},
	{
		title: 'Premium',
		subheader: 'Most popular',
		price: '900',
		description: ['20 users included', '10 GB of storage', 'Help center access', 'Priority email support'],
		buttonText: 'Register',
		buttonVariant: 'contained',
		backgroundcolor: '#DB3048',
		colorr: '#DB3048'
	},
	{
		title: 'Standard',
		price: '700',
		description: ['50 users included', '30 GB of storage', 'Help center access', 'Phone & email support'],
		buttonText: 'Register',
		buttonVariant: 'outlined',
		backgroundcolor: '#3CA1D7',
		colorr: '#3CA1D7'
	},
];

class ShowPackages extends React.Component {
	constructor(props) {
		super(props);
		this.handleRouting = this.handleRouting.bind(this);
	}

	handleRouting = () => {
		this.props.history.push('/payment');
	};





	
	
	render() {
		const classes = { useStyles };
	
		return (
			<React.Fragment>
				<CssBaseline />
			<Dashboard />
				
				<Container maxWidth="sm" component="main" className={classes.heroContent}>
					<Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom
						id="packages">
						Pricing
					</Typography>
					<Typography variant="h6" align="center" color="textSecondary" component="p">
						Quickly build an effective pricing table for your potential customers with this layout.
						It&apos;s built with default Material-UI components with little customization.
					</Typography>
				</Container>
				<br /><br />				
				<Container maxWidth="md" component="main">
					<Grid container spacing={5} alignItems="flex-end">
						
						{this.props.packagelist.map((tier)=>
							<Grid  item key={tier.id} xs={12} sm={tier.name === 'Enterprise' ? 12 : 6} md={4}>
							<Card style={{ borderRadius: '7px' }}>
								<CardHeader style={{ backgroundColor: '#38BC8B', color: 'white' }}
									title={tier.name}
									subheader='Popular'
									titleTypographyProps={{ align: 'center', }}
									subheaderTypographyProps={{ align: 'center' }}
									action={tier.title === 'Premium' ? <StarIcon /> : null}
									className={classes.cardHeader}

								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography align="center" component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
										<Typography variant="h6" color="textSecondary">
										
										</Typography>
									</div>							
											<Typography
												component="li"
												variant="subtitle1"
												align="center"
												key={tier.totalUsers}
											>
												{tier.totalUsers} users included
											</Typography>
											<Typography
												component="li"
												variant="subtitle1"
												align="center"
												key={tier.providedStorage}
											>
												{tier.bandwidth} GB of Storage
											</Typography>
								
								</CardContent>
							
								<CardActions >

									<ButtonGroup fullWidth
										alignItems='center' style={{ backgroundColor: '#38BC8B', margin: 10 }} >
										<Button style={{ color: 'white' }}
											onClick={() => this.props.fetchPackagebyId(tier.id)}>Edit</Button>
											<Button style={{ color: 'white' }} 
											onClick={()=>this.props.deletePackage(tier.id)}>Delete</Button>
									</ButtonGroup>
									


								</CardActions>
								
							</Card>
						</Grid>
							
						
						)}
						
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
}

export default ShowPackages;