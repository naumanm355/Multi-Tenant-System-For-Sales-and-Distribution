import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import { Link,withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(7, 7,4,7),
		marginTop: 85,
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(7, 4,4,4),
		},
	},
	textField: {
		marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
	},
	grid: {
		[theme.breakpoints.down('sm')]: {
			backgroundColor: theme.palette.secondary.main,
		},
	},
}));

 function CreatePackage(props) {
	const classes = useStyles();
	const [packageObj, setPackageAttribute] = useState({name:'',price:0,duration:0,storage:0,
	users:0});

	useEffect(() => {
		
		if(props.pack!==undefined){
			setPackageAttribute({name:props.pack.name,price:props.pack.price,duration:props.pack.durationPerMonth,
			storage:props.pack.bandwidth,users:props.pack.totalUsers})
		}
	  }, []);  //here if [] used mean render only first else render on state change 
	
	

		// Update the document title using the browser API
		//document.title = `You clicked ${count} times`;
	 


	return (
		<div style={{textAlign:'center'}}>
			
			<Paper className={classes.root} >
	  {props.pack!==undefined?
	  
	  <div>
		
	  <Grid container spacing={3} justify="center"
	  alignItems="center" >
		  <Grid item lg={6} md={6} xs={12}>
			  <TextField  fullWidth label="Package Name" className={classes.textField}
			  value={packageObj.name}
			  
			  onChange={(event)=>setPackageAttribute({...packageObj,name:event.target.value})} />
		  </Grid>
		  <Grid item lg={6} md={6}  xs={12}>
			  <TextField value={packageObj.price}
			   fullWidth label="Price" className={classes.textField} 
			  onChange={(event)=>setPackageAttribute({...packageObj,price:event.target.value})}/>
		  </Grid>

		  <Grid item lg={4} md={4} xs={12}>
			  <TextField  value={packageObj.duration}
			  fullWidth label="Duration in month" className={classes.textField} 
			  onChange={(event)=>setPackageAttribute({...packageObj,duration:event.target.value})}/>{' '}
		  </Grid>
		  <Grid item lg={4} md={4}  xs={12}>
			  <TextField  fullWidth label="No. of users" 
			  value={packageObj.users}
			  className={classes.textField} 
			  onChange={(event)=>setPackageAttribute({...packageObj,users:event.target.value})}/>
		  </Grid>
<Grid item lg={4} md={4} xs={12}>
			  <TextField value={packageObj.storage}
			   fullWidth label="storage in gb" className={classes.textField} 
			  onChange={(event)=>setPackageAttribute({...packageObj,storage:event.target.value})}/>
		  </Grid>

		  

	  
	  </Grid>
	  <br /> 	<br /> 
		  <Grid container spacing={2} justify='flex-start'>
		  <Grid item>
	  <Button alignItems="center" variant="contained" color="default"
	  onClick={()=>props.fetchPackage()}>
		  
			  Cancel
		  </Button>
		  </Grid>
	  <Grid item>
	  <Button alignItems="center" variant="contained" color="secondary" disabled={true}
	  onClick={()=>props.PostPackage(packageObj.name,packageObj.price,packageObj.users,
	  packageObj.storage,packageObj.duration)}>
		  
			  Save as New
		  </Button>
		  </Grid>
		  <Grid item 	>
			  <Button alignItems="center" variant="contained" color="primary"
			   onClick={()=>props.updatePackage(props.pack.id,packageObj.name,packageObj.price,packageObj.users,
				packageObj.storage,packageObj.duration)}
			  >
		  
			  Save
		  </Button>
		  </Grid>
		  </Grid>
		  </div>:
		  <div>
		  <Grid container spacing={3} justify="center"
		  alignItems="center" >
			  <Grid item lg={6} md={6} xs={12}>
				  <TextField  fullWidth label="Package Name" className={classes.textField}
				  
				  onChange={(event)=>setPackageAttribute({...packageObj,name:event.target.value})} />
			  </Grid>
			  <Grid item lg={6} md={6}  xs={12}>
				  <TextField  fullWidth label="Price" className={classes.textField} 
				  onChange={(event)=>setPackageAttribute({...packageObj,price:event.target.value})}/>
			  </Grid>

			  <Grid item lg={4} md={4} xs={12}>
				  <TextField  fullWidth label="Duration in month" className={classes.textField} 
				  onChange={(event)=>setPackageAttribute({...packageObj,duration:event.target.value})}/>{' '}
			  </Grid>
			  <Grid item lg={4} md={4}  xs={12}>
				  <TextField  fullWidth label="No. of users" className={classes.textField} 
				  onChange={(event)=>setPackageAttribute({...packageObj,users:event.target.value})}/>
			  </Grid>
	<Grid item lg={4} md={4} xs={12}>
				  <TextField  fullWidth label="storage in gb" className={classes.textField} 
				  onChange={(event)=>setPackageAttribute({...packageObj,storage:event.target.value})}/>
			  </Grid>

			  

		  
		  </Grid>
		  <br /> 	<br /> 
			  <Grid container spacing={2} justify='flex-start'>
			  <Grid item>
		  <Button alignItems="center" variant="contained" color="default"
		  onClick={()=>props.fetchPackage()}>
			  
				  Cancel
			  </Button>
			  </Grid>
		  <Grid item>
		  <Button alignItems="center" variant="contained" color="secondary"
		  onClick={()=>props.PostPackage(packageObj.name,packageObj.price,packageObj.users,
		  packageObj.storage,packageObj.duration)}>
			  
				  Save as New
			  </Button>
			  </Grid>
			  <Grid item 	onClick={()=>props.showPackage()}>
				  <Button alignItems="center" variant="contained" color="primary"
				  disabled={true}
				  >
			  
				  Save
			  </Button>
			  </Grid>
			  </Grid>
			  </div>	}
				
			</Paper>
		</div>
	);
}

export default withRouter(CreatePackage)