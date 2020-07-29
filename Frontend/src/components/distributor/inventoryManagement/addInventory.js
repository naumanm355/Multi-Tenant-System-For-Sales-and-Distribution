import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ROOT_URL from '../../../constants/config';
import Grid from '@material-ui/core/Grid';

import Select from '@material-ui/core/Select';
import { Link, withRouter } from 'react-router-dom';

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		// marginTop: 60,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		// width: 200,
	},
	// menu: {
	// 	width: 200,
	// },
	root: {
		padding: theme.spacing(2, 7, 4, 2),
		marginTop: 20,
	}
}));

export default function AddInventory(props) {
	const classes = useStyles();
	const [productlist, setProductList] = React.useState([]);
	const [item, selectItem] = React.useState('');
	const [selectedP, setProduct] = React.useState({
		name: '', category: ''
	})
	// const [rolesList, setList] = React.useState([]);
	const [inventObj, setObjKeyAttribute] = React.useState({
		totalPacket_Cartoon: 0, Price: 0
	})
	React.useEffect(() => {

		if (props.inventoryList !== undefined) {
			//alert("yes")
			setObjKeyAttribute({
				totalPacket_Cartoon: props.fetchInventories.inventoryList.totalPacket_Cartoon, Price: props.fetchInventories.inventoryList.price
			})
		}
	}, [])



	const handleChange = event => {
		setProductList(event.target.value);
	};

	useEffect(() => {
		//	alert("call")
		fetch(ROOT_URL+'/api/products/'// + props.distId
			, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					// Content-Type: application/json
					'Accept': 'application/json'
					// 'charset': 'UTF-8'
				},
				mode: 'cors'
			}).then((response) => {
				// console.log(response.status + "response" + "stattus text is" + response.statusText);
				if (response.status === 404) {
					alert("server error")
				}
				else {
					response.json().then(data => {
						//	alert("jbgjed" + data.allProducts.length);
						setProductList(data.allProducts)
					})
				}
			})

	}, [])


	return (
		<div className={classes.root}>
			{/* <Button
		variant="contained"
		color="primary"
		style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 20, cursor: 'default' }}
	>
		User Form
	</Button> */}



			{props.userDetail !== undefined
				?
				<Paper >
					<Grid container spacing={3}>

						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Select style={{ width: '100%' }} value={selectedP.category}
								onChange={(event) => setProduct({ ...selectedP, category: event.target.value })}>
								<MenuItem value=""><em>--Select--</em>	</MenuItem>
								{productlist.map((product) => {
									return <MenuItem value={product}>{product.category}</MenuItem>
								})}
							</Select>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Select style={{ width: '100%' }} value={selectedP.name}
								onChange={(event) => setProduct({ ...selectedP, name: event.target.value })}>
								<MenuItem value=""><em>--Select--</em>	</MenuItem>
								{productlist.map((product) => {
									return <MenuItem value={product}>{product.name}</MenuItem>
								})}
							</Select>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<TextField fullWidth label="TotalPacket_Cartoon" className={classes.textField}
								value={inventObj.totalPacket_Cartoon}
								onChange={(event) => setObjKeyAttribute({ ...inventObj, totalPacket_Cartoon: event.target.value })} />{' '}
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<TextField fullWidth label="price" className={classes.textField}
								value={inventObj.price}
								onChange={(event) => setObjKeyAttribute({ ...inventObj, price: event.target.value })} />
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
								onClick={() => props.PostInventory(inventObj, props.DistId)}
							>
								Save as New
</Button>
						</Grid>
						<Grid item>
							<Button alignItems="center" variant="contained" color="primary"
								onClick={() => props.fetchInventories(inventObj, props.distId, props.inventoryList._products.id)}>Save
</Button>
						</Grid>
					</Grid></Paper>
				:
				<Paper className={classes.root} >


					<Grid container spacing={3}>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Select style={{ marginTop: 15, width: '100%' }} value={selectedP.category}
								onChange={(event) => setProduct({ ...selectedP, category: event.target.value })}>
								<MenuItem value=""><em>--Select--</em>	</MenuItem>
								{productlist.map((product) => {
									return <MenuItem value={product.category}>{product.category}</MenuItem>
								})}
							</Select>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<Select style={{ marginTop: 15, width: '100%' }} value={selectedP.name}
								onChange={(event) => setProduct({ ...selectedP, name: event.target.value })}>
								<MenuItem value=""><em>--Select--</em>	</MenuItem>
								{productlist.map((product) => {
									return <MenuItem value={product.name}>{product.name}</MenuItem>
								})}
							</Select>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<TextField fullWidth label="TotalPacket_Cartoon" className={classes.textField}
								onChange={(event) => setObjKeyAttribute({ ...inventObj, totalPacket_Cartoon: event.target.value })} />{' '}
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<TextField fullWidth label="Price" className={classes.textField}
								onChange={(event) => setObjKeyAttribute({ ...inventObj, Price: event.target.value })} />
						</Grid>
					</Grid>
					<br /> 	<br />
					<Grid container spacing={2} justify="flex-start">
						<Grid item>
							<Button alignItems="center" variant="contained" color="default"
								onClick={() => props.fetchInventories(props.distId)}>Cancel</Button>
						</Grid>
						<Grid item>
							<Button alignItems="center" variant="contained" color="secondary"
								onClick={() => props.PostInventory(props.distId, selectedP, inventObj.totalPacket_Cartoon,
									inventObj.Price)}>
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
