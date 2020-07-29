import React, { useState,useEffect } from 'react';
import SimpleAppBar from './layouts/appBar.js';
import ShowPackageUser from './pricing'
import Footer from './layouts/footer.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clientSideBG2 from './imgaes/clientSideBG2.jpg';
import Scroll from 'react-scroll';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button";

var scroll = Scroll.animateScroll;

const useStyles = makeStyles(theme => (
	{
	img: {
		[theme.breakpoints.up('md')]: {
			width: '100%',
			height: '100%',
			backgroundImage: `url(${clientSideBG2})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			paddingBottom: '10%',
			height: 500,
		},
		[theme.breakpoints.down('md')]: {
			width: '100%',
			height: '100%',
			backgroundImage: `url(${clientSideBG2})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			paddingBottom: '10%',
		},
	},

	imgText: {
		[theme.breakpoints.up('md')]: {
			color: 'white',
			fontWeight: 'bold',
			fontFamily: 'serif',
			fontSize: 60,
		},
		[theme.breakpoints.down('md')]: {
			color: 'white',
			fontWeight: 'bold',
			fontFamily: 'serif',
			fontSize: 50,
			paddingBottom: '2%',
		},
		// [theme.breakpoints.up('md')]: {
		//   backgroundColor: theme.palette.primary.main,
		// },
		// [theme.breakpoints.up('lg')]: {

		// },
	},
	imgTextF: {
		[theme.breakpoints.up('md')]: {
			color: 'white',
			fontSize: 15,
			marginTop: 50,
		},
		[theme.breakpoints.down('md')]: {
			color: 'white',
			fontSize: 15,
		},
		scroll:{
			opacity: '1',
			backgroundColor: 'aqua',
			width: '40px',
			height: '40px',
			position: 'fixed',
			bottom: '10px',
			right: '10px',
			borderRadius: '5px',
			border: 'none',
	  
			hover: {
				opacity: 1,
			}
		},
		arrowup: {
			color: 'white',
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: '-9px',
			marginLeft: '-5px',
		}

	}
}));

export default function Home() {
	
	
	function scrollToTop() {
		scroll.scrollToTop();
	}


	const classes = useStyles();
	return (
		<React.Fragment>
		<CssBaseline />
		
			<SimpleAppBar />
			
			<Grid container direction="row">
				<Grid item container align="center" className={classes.img} justify="center">
					<Grid item lg={12} xs={12} style={{ paddingTop: 70 }}>
						<Typography align="center" className={classes.imgTextF}>
							Sales And Distribution
						</Typography>
						<Typography align="center" variant="h1" className={classes.imgText}>
							<i>
								{' '}
								Digitilize your business through <i style={{ color: '#1b5e20' }}>Sales</i>
								<br />
								and <i style={{ color: '#1b5e20' }}>Distribution</i>
							</i>
						</Typography>
					</Grid>
					<Grid item lg={3} style={{ alignItems: 'center' }} alignContent="center">
						<Button variant="contained" size='large' style={{backgroundColor:'#1b5e20',color:'white'}}
						href="/pricing">
							Packages
						</Button>
					</Grid>
				</Grid>
			</Grid>

		
		
			<Grid align="right">
			<ScrollUpButton style={{width:'40px',height:'40px', borderRadius:'5px',padding:8,color:'#ffffff'}}
			ToggledStyle={{color:'#ffffff'}} />
				{/* <button onClick={scrollToTop} className={classes.scroll}>
					To the top!
				</button> */}
			</Grid>
			<br />
			<ShowPackageUser />

			<Footer />
		</React.Fragment>
	);
}
