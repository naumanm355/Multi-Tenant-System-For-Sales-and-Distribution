import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import agentlocation from './imgaes/agentLocation.PNG'
import distributorreport from './imgaes/distributorProfitReport.PNG'
import fieldagent from './imgaes/FiledAgent.PNG'
import { typography } from '@material-ui/system';
const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	card: {
		// minWidth: 150,
	},
	bullet: {
		display: 'inline-block',
		// margin: '0 2px',
		transform: 'scale(0.8)',
		fontSize:40,
		color:'#000000'
	},
	title: {
		fontSize: 10
	},
	pos: {
		marginBottom: 12,
	},
});


function Courses(props) {
	const { classes } = props;
	const bull = <span className={classes.bullet}>•</span>;


	return (
		<div className={classes.root}>
			{/* <Button>Add Courses</Button> */}
			<br />
			<Typography variant="h4"  align='center'   gutterBottom>
								Explore Features
								</Typography>
			
			<Grid container direction="column" align="center" >
				<Grid container direction="row" style={{backgroundColor:'#f6f6f6',borderRadius:'2px'}}>
					<Grid item xs={12} sm={12} md={6} lg={6} >
						<Grid className={classes.card}>
							<CardContent>


								<Typography variant="h5" component="h5"
								style={{fontWeight:'bold'}}
								gutterBottom>
								Track Agent location
								</Typography>
								<ul style={{textAlign:'left',fontSize:'20px',fontWeight:4000,lineHeight:2}}>
									<li>Distributor can track agent location</li>
									<li>Define and manage n-level hierarchy of locations.</li>
									<li>Map customers and field sales agents to locations if desired.</li>
								</ul>
								
							</CardContent>
							
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} style={{height:400,padding:30}}>
						
						<img src={agentlocation} style={{width:'100%',height:'100%',borderRadius:'2px'}}/>

					</Grid>
				</Grid>

				

				<Grid container direction="row" style={{borderRadius:'2px'}}>
					<Grid item xs={12} sm={12} md={6} lg={6} style={{height:400,padding:30}}>
							
							<img src={distributorreport} style={{width:'100%',height:'100%',borderRadius:'2px'}}/>
									
					</Grid>

					<Grid item xs={12} sm={12} md={6} lg={6} >
						<Grid className={classes.card}>
							<CardContent>
								<Typography variant="h5" component="h5"
									style={{fontWeight:'bold'}} gutterBottom>
								Distributor Report
								</Typography>
								<ul style={{textAlign:'left',fontSize:'20px',fontWeight:4000,lineHeight:2}}>
									<li>Maintain Distribuotr Report</li>
									<li>Add Multiple Agent</li>
									<li>Maintain Multiple Agent</li>
								</ul>
							</CardContent>
							
						</Grid>
					</Grid>
					
				</Grid>

			
				<Grid container direction="row" style={{backgroundColor:'#f6f6f6',borderRadius:'2px'}}>
					<Grid item xs={12} sm={12} md={6} lg={6} >
						<Grid className={classes.card}>
							<CardContent>
							<Typography variant="h5" 
								style={{fontWeight:'bold'}}
							component="h5" gutterBottom>
									Field Agent
								</Typography>
								<ul style={{textAlign:'left',fontSize:'20px',fontWeight:4000,lineHeight:2}}>
									<li>Define Multiple Field Agent</li>
									<li>Add Multiple Agent</li>
									<li>Maintain Multiple Agent</li>
								</ul>
							</CardContent>
							
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6} style={{height:400,padding:30}}>
						
								<img src={fieldagent} style={{width:'100%',height:'100%',borderRadius:'2px'}}/>
								
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

Courses.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Courses);
