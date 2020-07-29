import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Link,withRouter } from 'react-router-dom';
import TransferList from './transferList'

const useStyles = makeStyles(theme => ({
	root: {
	//	padding: theme.spacing(7, 7,4,7),
		//marginTop: 60,
	},
	paperRoot: {
		marginTop:60,
		padding: theme.spacing(2,3,3,3),
		//marginTop: 60,
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
const privilagesList=[
	{title:'Product',margin:0},{title:'Add Product',margin:20},{title:'Product Discount',margin:20},
	{title:'Manage Distributor',margin:0},{title:'Add Distributor',margin:20},{title:'Product Discount',margin:20},

]


 function CreateRole(props) {
	const classes = useStyles();
	const [list, selectItem] = React.useState([]);
	const [roleName,setRole]=React.useState('')
const [selectedL,setList]=React.useState([])
const [rolePrivilegeList,setrolePrivilegeList]=React.useState([])
	function getSelectedList(lst){
	//	alert("call back called")
	//alert("ln is"+lst.length)
	selectItem(lst)
	}
	React.useEffect(()=>{
		if (props.specificrolePrivilegeList.length!== 0) {
		//	alert("update mode state is " +roleName)
		setRole(props.specificrolePrivilegeList[0].role.name)
props.specificrolePrivilegeList.map((obj)=>{
	//alert("priv is"+obj.privilege.name)
	selectedL.push(obj.privilege.name)
	rolePrivilegeList.push(obj.rolePrv.id)  //for backend update

})
			
		}
		else{
		//	alert("create mode")
		}
	},[])
	//alert("specific list length is"+props.specificrolePrivilegeList.length)
	return (
	
	
					<Paper className={classes.paperRoot}>
					{props.specificrolePrivilegeList.length!== 0?
					<div>
						{/* {selectedL.length} */}
						 <Grid container spacing={3} direction="column" justify="center">
			
						 <Grid item >
							 <TextField  label="Role (Required)"
							 value={roleName}
							 disabled={true}
							 className={classes.textField} 
							 onChange={(event)=>setRole(event.target.value)}
							 />
						 </Grid>
	 
						 <Grid item >
						 <Typography variant="h6">Choose Privileges</Typography>
						 </Grid>
						 
							 <Grid item><TransferList getSelectedList={getSelectedList}
							 previousSelectedPrivilegeList={selectedL}
							 /></Grid>
					 
					 </Grid> 
					 <br /> 	<br />
						 <Grid container spacing={2} justify="flex-start"
						 >
						 <Grid item>
					 <Button alignItems="center" variant="contained" color="default"
					 onClick={
						 ()=>{
						  props.GetRolePrivileges(props.userId)// props.showRole()//;props.history.push('/distributor/snd/roles/showRole')
						 }
					   }>
						 
						 Cancel
					 
					 </Button></Grid>
					 <Grid item>
					 <Button alignItems="center" variant="contained" color="secondary"
					 onClick={
						 ()=>{
						   props.showRole()//;props.history.push('/distributor/snd/roles/showRole')
						 }
					   } disabled={true}
					   >
						 
							 Save as New
						 </Button>
						 </Grid>
						 <Grid item>
							 <Button alignItems="center" variant="contained" color="primary"
							 onClick={
								 ()=>{
									 props.updatePrivilegesofSpecificRole(roleName,rolePrivilegeList,list,props.userId)
								  // props.showRole();props.history.push('/distributor/snd/roles/showRole')
								 }
							   }>
						 
							 Save
						 </Button>
						 </Grid>
						 </Grid></div>
						:
						<div>
						<Grid container spacing={3} direction="column" justify="center">
					
						<Grid item >
							<TextField  label="Role (Required)" className={classes.textField} 
							onChange={(event)=>setRole(event.target.value)}
							/>
						</Grid>
					
				
						<Grid item >
						<Typography variant="h6">Choose Privileges</Typography>
						</Grid>
						
							<Grid item><TransferList getSelectedList={getSelectedList}
							 previousSelectedPrivilegeList={[]}
							/></Grid>
					
					</Grid> 
					<br /> 	<br />
						<Grid container spacing={2} justify="flex-start"
						>
						<Grid item>
					<Button alignItems="center" variant="contained" color="default"
					onClick={
						()=>{
						 props.GetRolePrivileges(props.userId)// props.showRole()//;props.history.push('/distributor/snd/roles/showRole')
						}
					  }>
						
						Cancel
					
					</Button></Grid>
					<Grid item>
					<Button alignItems="center" variant="contained" color="secondary"
					onClick={
						()=>{
							props.AssignRolePrivileges(roleName,props.userId,list)
						}
					  }>
						
							Save as New
						</Button>
						</Grid>
						<Grid item>
							<Button alignItems="center" variant="contained" color="primary"
							disabled={true}
							onClick={
								()=>{
									
								 // props.showRole();props.history.push('/distributor/snd/roles/showRole')
								}
							  }>
						
							Save
						</Button>
						</Grid>
						</Grid>
						</div>}	
				
				
				
			</Paper>
			
	
	);
}

export default withRouter(CreateRole)