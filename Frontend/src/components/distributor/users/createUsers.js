import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(7, 7, 4, 7),
		marginTop: 60,
		
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

function CreateUser(props) {
	const classes = useStyles();
	const [item, selectItem] = React.useState('');
	const [rolesList, setList] = React.useState([]);
	const [userObj, setObjKeyAttribute] = React.useState({
		FirstName: '', LastName: '', Email: '', Contact: '', Address: '',
		RoleName: '',UserId:0
	})
	React.useEffect(()=>{
		
		if (props.rolesList.length !== 0) {
		//	alert("roles list length is"+props.rolesList.length)
			props.rolesList.map((role) => {
				if (!rolesList.includes(role.roleName)) {
					rolesList.push(role.roleName)
				}
			})
		}
	
		if (props.userDetail !== undefined) {
			//alert("yes")
			setObjKeyAttribute({FirstName:props.userDetail.user.firstName,LastName:props.userDetail.user.lastName
	,Email:props.userDetail.user.email,Contact:props.userDetail.user.contact
	,Address:props.userDetail.user.address,RoleName:props.userDetail.user_Role.name,
	UserId:props.userDetail.user.id
			})
		}
	},[])


	return (
		<div>
			{/* <Button
				variant="contained"
				color="primary"
				style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 20, cursor: 'default' }}
			>
				User Form
			</Button> */}
		

				
{props.userDetail!==undefined
	?
	<Paper className={classes.root} >
	<Grid container spacing={3}>

	<Grid item md={6} sm={12} xs={12}>
		<TextField fullWidth label="FirstName (Required)" className={classes.textField}
		value={userObj.FirstName}
			onChange={(event) => setObjKeyAttribute({ ...userObj, FirstName: event.target.value })} />
	</Grid>
	<Grid item md={6} sm={12} xs={12}>
		<TextField fullWidth label="LastName (Required)" className={classes.textField}
		value={userObj.LastName}
			onChange={(event) => setObjKeyAttribute({ ...userObj, LastName: event.target.value })} />
	</Grid>
	<Grid item lg={4} md={4} sm={12} xs={12}>
		<TextField fullWidth label="Email (Required)" className={classes.textField}
		value={userObj.Email}
			onChange={(event) => setObjKeyAttribute({ ...userObj, Email: event.target.value })} />{' '}
	</Grid>
	<Grid item lg={4} md={4} sm={12} xs={12}>
		<TextField fullWidth label="Contact (Required)" className={classes.textField}
		value={userObj.Contact}
			onChange={(event) => setObjKeyAttribute({ ...userObj, Contact: event.target.value })} />
	</Grid>
	<Grid item lg={4} md={4} sm={12} xs={12}>
		<Select style={{ marginTop: 15, width: '100%' }} value={userObj.RoleName}
			onChange={(event) => setObjKeyAttribute({ ...userObj, RoleName: event.target.value })}>
			<MenuItem value=""><em>--Select--</em>	</MenuItem>
			{rolesList.map((role) => {
				return <MenuItem value={role}>{role}</MenuItem>
			})}
		</Select>
	</Grid>
	<Grid item lg={12} xs={12}>
		<TextField fullWidth label="Address (Required)" className={classes.textField}
		value={userObj.Address}
			onChange={(event) => setObjKeyAttribute({ ...userObj, Address: event.target.value })}
		/>
	</Grid>
</Grid>
<br /> 	<br />
<Grid container spacing={2} justify="flex-start">
	<Grid item>
		<Button alignItems="center" variant="contained" color="default"
			onClick={() => props.GetUsertoRole(props.DistId)}>Cancel</Button>
	</Grid>
	<Grid item>
		<Button alignItems="center" variant="contained" color="secondary"
		disabled={true}
		//	onClick={() => props.AssignUsertoRole(userObj, props.DistId)}
		>
			Save as New
	</Button>
	</Grid>
	<Grid item>
		<Button alignItems="center" variant="contained" color="primary"
			onClick={() => props.UpdateUsertoRole(userObj,props.DistId,props.userDetail.userRoleId)}>Save
	</Button>
	</Grid>
</Grid></Paper>
				:
				<Paper className={classes.root} >
				<Grid container spacing={3}>

					<Grid item md={6} sm={12} xs={12}>
						<TextField fullWidth label="FirstName (Required)" className={classes.textField}
							onChange={(event) => setObjKeyAttribute({ ...userObj, FirstName: event.target.value })} />
					</Grid>
					<Grid item md={6} sm={12} xs={12}>
						<TextField fullWidth label="LastName (Required)" className={classes.textField}
							onChange={(event) => setObjKeyAttribute({ ...userObj, LastName: event.target.value })} />
					</Grid>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<TextField fullWidth label="Email (Required)" className={classes.textField}
							onChange={(event) => setObjKeyAttribute({ ...userObj, Email: event.target.value })} />{' '}
					</Grid>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<TextField fullWidth label="Contact (Required)" className={classes.textField}
							onChange={(event) => setObjKeyAttribute({ ...userObj, Contact: event.target.value })} />
					</Grid>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<Select style={{ marginTop: 15, width: '100%' }} value={userObj.RoleName}
							onChange={(event) => setObjKeyAttribute({ ...userObj, RoleName: event.target.value })}>
							<MenuItem value=""><em>--Select--</em>	</MenuItem>
							{rolesList.map((role) => {
								return <MenuItem value={role}>{role}</MenuItem>
							})}
						</Select>
					</Grid>
					<Grid item lg={12} xs={12}>
						<TextField fullWidth label="Address (Required)" className={classes.textField}
							onChange={(event) => setObjKeyAttribute({ ...userObj, Address: event.target.value })}
						/>
					</Grid>
				</Grid>
				<br /> 	<br />
				<Grid container spacing={2} justify="flex-start">
					<Grid item>
						<Button alignItems="center" variant="contained" color="default"
							onClick={() => props.GetUsertoRole(props.DistId)}>Cancel</Button>
					</Grid>
					<Grid item>
						<Button alignItems="center" variant="contained" color="secondary"
							onClick={() => props.AssignUsertoRole(userObj, props.DistId)}>
							Save as New
					</Button>
					</Grid>
					<Grid item>
						<Button alignItems="center" variant="contained" color="primary"
						disabled={true}	//onClick={() => props.showUser()}
							>Save
					</Button>
					</Grid>
				</Grid>
				</Paper>
				}
			
		</div>
	);
}

export default withRouter(CreateUser)