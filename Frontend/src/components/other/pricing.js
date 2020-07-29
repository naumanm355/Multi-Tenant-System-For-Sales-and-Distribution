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


import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import ROOT_URL from '../../constants/config';
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
		//marginTop:20,
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

class ShowPackageUser extends React.Component {
	constructor(props) {
		super(props);
		this.handleRouting = this.handleRouting.bind(this);
		this.state = { packagesList: [], error: '' }
	}

	handleRouting = () => {
		this.props.history.push('/payment');
	};

	componentDidMount() {
		fetch(ROOT_URL+'/api/Packages', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			mode: 'cors',
		}).then((response) => {
			console.log(response.status + "response" + "stattus text is" + response.statusText);
			if (response.status === 404) {
				alert("server error")
			}
			else {
				response.json().then(data => {
					if (data.packageStatus == 'GetAll') {
						this.setState({ packagesList: data.allPackages })
					}
					else {
						this.setState({ error: 'error' })
					}
				})
			}
		}).catch(error => console.log(error))

	}

	render() {
		const classes = { useStyles };
		return (
			<React.Fragment>
				<CssBaseline />


				{/* <Button onClick={()=>this.props.createPackage()}>create package</Button> */}
				<Container maxWidth="sm" component="main" className={classes.heroContent}>
					<Typography variant="h4" align="center" color="textPrimary" gutterBottom
						id="packages">
						Pricing
					</Typography>
					<Typography variant="h6" align="center" color="textSecondary" component="p">
						Quickly build an effective pricing table for your potential customers with this layout.
						It&apos;s built with default Material-UI components with little customization.
					</Typography>
				</Container>
				<br /><br />
				{/* End hero unit */}
				<Container maxWidth="md" component="main">
					<Grid container spacing={5} alignItems="flex-end">

						{this.state.packagesList.map((tier) =>
							<Grid item key={tier.name} xs={12} sm={tier.name === 'Enterprise' ? 12 : 6} md={4}>
								<Card style={{ borderRadius: '7px' }}>
									<CardHeader style={{ backgroundColor: '#38BC8B', color: 'white' }}
										title={tier.name}
										subheader='Popular'//{tier.subheader}
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
										{/* <ul> */}
										{/* {tier.description.map(line => ( */}
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
											key={tier.totalusers}
										>
											{tier.bandwidth} GB of Storage
											</Typography>

									</CardContent>

									<CardActions >
									<Button fullWidth
											alignItems='center' style={{ backgroundColor: '#38BC8B', margin: 10,color:'white' }} 
												onClick={() => this.props.history.push('/signupandpayment')}>Register</Button>
										 {/* <ButtonGroup fullWidth
											alignItems='center' style={{ backgroundColor: '#38BC8B', margin: 10 }} >
											<Button style={{ color: 'white' }}
												onClick={() => this.props.createPackage()}>Edit</Button>
											<Button style={{ color: 'white' }} onClick={() => this.props.createPackage()}>Delete</Button>
										</ButtonGroup>  */}


									</CardActions>

								</Card>
							</Grid>
						)

							// tiers.map(tier => (
							// 	// Enterprise card is full width at sm breakpoint
							// 	<Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
							// 		<Card style={{ borderRadius: '7px' }}>
							// 			<CardHeader style={{ backgroundColor: tier.backgroundcolor, color: 'white' }}
							// 				title={tier.title}
							// 				subheader={tier.subheader}
							// 				titleTypographyProps={{ align: 'center', }}
							// 				subheaderTypographyProps={{ align: 'center' }}
							// 				action={tier.title === 'Premium' ? <StarIcon /> : null}
							// 				className={classes.cardHeader}

							// 			/>
							// 			<CardContent>
							// 				<div className={classes.cardPricing}>
							// 					<Typography align="center" component="h2" variant="h4" color="textPrimary">
							// 						${tier.price}
							// 					</Typography>
							// 					<Typography variant="h6" color="textSecondary">

							// 					</Typography>
							// 				</div>
							// 				<ul>
							// 					{tier.description.map(line => (
							// 						<Typography
							// 							component="li"
							// 							variant="subtitle1"
							// 							align="center"
							// 							key={line}
							// 						>
							// 							{line}
							// 						</Typography>
							// 					))}
							// 				</ul>
							// 			</CardContent>

							// 			<CardActions >

							// 				{window.location.pathname === '/admin/snd/packages' ? <ButtonGroup fullWidth
							// 					alignItems='center' style={{ backgroundColor: tier.colorr, margin: 10 }} >
							// 					<Button style={{ color: 'white' }}
							// 						onClick={() => this.props.createPackage()}>Edit</Button>
							// 						<Button style={{ color: 'white' }} onClick={() => this.props.createPackage()}>Delete</Button>
							// 				</ButtonGroup> :
							// 					<Button style={{ borderRadius: '9px', color: "white", backgroundColor: tier.colorr, padding: 10, margin: 10 }}
							// 						fullWidth onClick={() => this.props.history.push('/signupandpayment')}>
							// 						{tier.buttonText}
							// 					</Button>}


							// 			</CardActions>

							// 		</Card>
							// 	</Grid>
							// )
							//	)

						}

					</Grid>
				</Container>
			</React.Fragment>
		);
	}
}

export default withRouter(ShowPackageUser);