import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import CustomizedMenus from '../../superAdmin/dashboard/Menus'
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChartContainer from '../../superAdmin/dashboard/chartContainer'
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import NestedList from './DropDownMenu'
import withWidth from '@material-ui/core/withWidth';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import { FetchRolesbyDistributor, GetUsertoRole, GetRolePrivileges } from '../../../actions/usersActions'
import { Users_Action, Users_Status } from '../../../constants/usersActions'

// Product Management
import { fetchProducts, PostProduct } from '../../../actions/productActions'
import { Products_Status, Products_Action } from '../../../constants/productActions';
import ShowProduct from '../productManagement/showProducts';
import AddProduct from '../productManagement/addProduct';
import ProductsView from '../productManagement/products_view';
import { fetchDistributoAgentCustomer, postAgentCustomer, getCustomerOfAgent } from '../../../actions/fieldActions'
import { SaleOrder_Action, SaleOrder_Status } from '../../../constants/saleOrderActions'
// Inventory Management
import AddInventory from '../inventoryManagement/addInventory';
import ShowInventory from '../inventoryManagement/showInventory'
import { fetchInventories } from '../../../actions/inventoryActions';
import { Inventory_Action, Inventory_Status } from '../../../constants/inventoryConstants';
// Sales Order management
import { Order_Action, Order_Status } from '../../../constants/salesOrderManagement'
import { getSalesOrders } from '../../../actions/salesOrderAction';
// Merchandising
import ViewPlanogram from '../Merchandising/Planograms/viewPlanograms';
import Definition from '../Merchandising/Planograms/definition';
import { stat } from 'fs';


const mapStateToProps = state => ({

	users_Status: state.users_Reducer.users_status,
	products_Status: state.product_Reducer.products_status,
	inventory_Status: state.inventory_Reducer.inventory_status,
	order_Status: state.order_Reducer.order_status,
	saleOrder_Status: state.saleOrder_Reducer.saleorder_status,
	agentOfCustomerLists: state.saleOrder_Reducer.agentOfCustomerLists,
})

const mapDipatchToProps = dispatch => ({
	getCustomerOfAgent: (distId) => { dispatch(getCustomerOfAgent(distId)) },
	fetchDistributoAgentCustomer: (distId) => { dispatch(fetchDistributoAgentCustomer(distId)) },
	LoadNewUser: () => { dispatch({ type: Users_Action.NEW }) },
	LoadShowUser: () => { dispatch({ type: Users_Action.SHOW }) },
	LoadNewRole: () => { dispatch({ type: Users_Action.NEWRole }) },
	LoadShowRole: () => { dispatch({ type: Users_Action.SHOWROLE }) },
	LoadPostField: () => { dispatch({ type: SaleOrder_Action.SHOWAGENTCUST }) },
	GetRolePrivileges: (DistributorId) => dispatch(GetRolePrivileges(DistributorId)),
	FetchRolesbyDistributor: (DistributorId) => { dispatch(FetchRolesbyDistributor(DistributorId)) },
	GetUsertoRole: (DistId) => dispatch(GetUsertoRole(DistId)),
	//Products
	fetchProducts: (distId) => { dispatch(fetchProducts(distId)) },
	PostProduct: () => { dispatch({ type: Products_Action.NEW }) },
	// inventory
	fetchInventories: (DistributorId) => { dispatch(fetchInventories(DistributorId)) },
	PostInventory: () => { dispatch({ type: Inventory_Action.NEW }) },
	// Sales Order Management
	getSalesOrders: (DistributorId) => { dispatch(getSalesOrders(DistributorId)) }
})
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},

	///drawer classes
	drawerRoot: {
		paddingTop: 60,
		width: '100%',
		maxWidth: 240,
		height: '100%',
		overflowY: 'hidden',
		//paddingBottom: '170%',
		backgroundColor: 'red'//theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function DashboardDis(props) {
	const { container, getScreen } = props;
	const [open, setOpen] = React.useState(false);
	const [itemopenState, toggleDrawerItems] = React.useState({
		rolesModule: false, userModule: false,
		productModule: false, inventoryModule: false,//saleOrderManageModule:false,
		marketingModule: false, fieldModule: false,
		reportsModule: false
	});
	const [headerMargin, setMargin] = useState(80)
	function handleClick() {
		setOpen(!open);
	}

	function toggleDrawerListItems(activeItem) {
		//alert("value is "+activeItem)
		switch (activeItem) {
			case 'roles': toggleDrawerItems({
				rolesModule: !itemopenState.rolesModule,
				userModule: false, productModule: false, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: false, fieldModule: false, reportsModule: false
			}); break;
			case 'users': toggleDrawerItems({
				rolesModule: false,
				userModule: !itemopenState.userModule, productModule: false, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: false, fieldModule: false, reportsModule: false
			}); break;
			case 'products': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: !itemopenState.productModule, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: false, fieldModule: false, reportsModule: false
			}); break;
			case 'inventory': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: false, inventoryModule: !itemopenState.inventoryModule, saleOrderManageModule: false,
				marketingModule: false, fieldModule: false, reportsModule: false

			}); break;
			case 'saleorder': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: false, inventoryModule: false, saleOrderManageModule: !itemopenState.saleOrderManageModule,
				marketingModule: false, fieldModule: false, reportsModule: false
			}); break;
			case 'marketing': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: false, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: !itemopenState.marketingModule, fieldModule: false, reportsModule: false
			}); break;
			case 'fieldManage': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: false, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: false, fieldModule: !itemopenState.fieldModule, reportsModule: false
			}); break;
			case 'reportsManage': toggleDrawerItems({
				rolesModule: false,
				userModule: false, productModule: false, inventoryModule: false, saleOrderManageModule: false,
				marketingModule: false, fieldModule: false, reportsModule: !itemopenState.reports
			}); break;
			default: break;
		}
		//toggleDrawerItems({})
	}
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);


	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	//alert("mp" + props.products_Status + "fe" + props.users_Status)



	const header = (
		<AppBar position="static">
			<Toolbar variant="dense">
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit">
					Photos
          </Typography>
			</Toolbar>
		</AppBar>
	);


	const drawer = (
		<List style={{ backgroundColor: '#212121', color: 'white' }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={classes.drawerRoot}
		>
			<ListItem button onClick={() => props.history.push('/distributor/snd/dashboard/' + props.match.params.userId)}>
				<ListItemIcon>
					<DashboardIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Dashboard" style={{ marginLeft: -15 }} />
			</ListItem>

			<ListItem button onClick={() => toggleDrawerListItems('roles')}//{handleClick}
			>
				<ListItemIcon>
					<PeopleIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Roles" style={{ marginLeft: -15 }} />
				{itemopenState.rolesModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.rolesModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/roles/' + props.match.params.userId ?
								props.LoadNewRole() : props.LoadNewRole(); props.history.push('/distributor/snd/roles/' + props.match.params.userId)
						}}>
						<ListItemIcon>
							<GroupAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Create Roles" />
					</ListItem>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/roles/' + props.match.params.userId ? props.GetRolePrivileges(props.match.params.userId) :
								props.GetRolePrivileges(props.match.params.userId); props.history.push('/distributor/snd/roles/' + props.match.params.userId)
						}}>
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show Roles" />
					</ListItem>
				</List>
			</Collapse>


			<ListItem button onClick={() => toggleDrawerListItems('users')}//{handleClick}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Users" style={{ marginLeft: -15 }} />
				{itemopenState.userModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.userModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname == '/distributor/snd/users/' + props.match.params.userId ?
								// props.LoadNewUser():props.LoadNewUser(); props.history.push('/distributor/snd/users/'+props.match.params.userId) }}>

								props.FetchRolesbyDistributor(props.match.params.userId) :
								props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
						}}>
						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Create User" />
					</ListItem>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname == '/distributor/snd/users/' + props.match.params.userId ?
								props.GetUsertoRole(props.match.params.userId) ://props.LoadShowUser():
								props.GetUsertoRole(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
						}}>
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show User" />
					</ListItem>
				</List>
			</Collapse>
			{/* Manage Products */}

			<ListItem button onClick={() => toggleDrawerListItems('products')}//{handleClick}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Products" style={{ marginLeft: -15 }} />
				{itemopenState.productModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.productModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/products/' + props.match.params.userId ?
								props.PostProduct() :
								props.history.push('/distributor/snd/products/' + props.match.params.userId)
							props.PostProduct()

						}}>
						{/* props.LoadNewUser():props.LoadNewUser(); props.history.push('/distributor/snd/users/'+props.match.params.id) }}> */}

						{/* props.FetchRolesbyDistributor(props.match.params.product): */}
						{/* // props.FetchRolesbyDistributor(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Add Product" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname == '/distributor/snd/products/' + props.match.params.userId ?
								props.fetchProducts(props.match.params.userId) :
								props.history.push('/distributor/snd/products/' + props.match.params.userId);
							props.fetchProducts(props.match.params.userId)
						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show Products" />
					</ListItem>
				</List>
			</Collapse>

			{/* Inventory Management */}
			<ListItem button onClick={() => toggleDrawerListItems('inventory')}//{handleClick}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Manage Inventory" style={{ marginLeft: -15 }} />
				{itemopenState.inventoryModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.inventoryModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname == '/distributor/snd/inventory/' + props.match.params.userId ?
								props.PostInventory() :
								props.history.push('/distributor/snd/inventory/' + props.match.params.userId);
							props.PostInventory();

						}}
					>
						{/* props.LoadNewUser():props.LoadNewUser(); props.history.push('/distributor/snd/users/'+props.match.params.id) }}> */}

						{/* props.FetchRolesbyDistributor(props.match.params.product): */}
						{/* // props.FetchRolesbyDistributor(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}

						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Add Inventory" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname == '/distributor/snd/inventory/' + props.match.params.userId ?
								props.fetchInventories(props.match.params.userId) :
								props.history.push('/distributor/snd/inventory/' + props.match.params.userId);
							props.fetchInventories(props.match.params.userId);
						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Show Inventory" />
					</ListItem>
				</List>
			</Collapse>
			{/* Sales Order Management */}
			{/* <Collapse in={true} timeout="auto" unmountOnExit>
				<List component="div" disablePadding> */}
			<ListItem button
				onClick={() => {
					window.location.pathname == '/distributor/snd/salesorder/' + props.match.params.userId ?
						props.getSalesOrders(props.match.params.userId) :
						props.history.push('/distributor/snd/salesorder/' + props.match.params.userId);
					props.getSalesOrders(props.match.params.userId);
				}}>

				{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
				{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
				<ListItemIcon>
					<ViewListIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Show SalesOrders" style={{ marginLeft: -15 }} />
			</ListItem>
			{/* </List>
			</Collapse> */}
			{/* // Merchandising	 */}

			<ListItem button onClick={() => toggleDrawerListItems('marketing')}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Marketing and Merchandising" style={{ marginLeft: -15 }} />
				{itemopenState.marketingModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.marketingModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							if (window.location.pathname !== '/distributor/snd/merchandising/definition') {
								return props.history.push('/distributor/snd/merchandising/definition')
							} else {
								return props.history.push('/distributor/snd/merchandising/definition')
							}

						}}
					>
						{/* props.LoadNewUser():props.LoadNewUser(); props.history.push('/distributor/snd/users/'+props.match.params.id) }}> */}

						{/* props.FetchRolesbyDistributor(props.match.params.product): */}
						{/* // props.FetchRolesbyDistributor(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}

						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Definition" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							if (window.location.pathname !== '/distributor/snd/merchandising/viewplanograms') {
								return props.history.push('/distributor/snd/merchandising/viewplanograms')
							} else {
								return props.history.push('/distributor/snd/merchandising/viewplanograms')
							}

						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="View Planograms" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={() => toggleDrawerListItems('saleorder')}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Field Management" style={{ marginLeft: -15 }} />
				{itemopenState.saleOrderManageModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.saleOrderManageModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/field/' + props.match.params.userId ?
								props.fetchDistributoAgentCustomer(props.match.params.userId) : props.fetchDistributoAgentCustomer(props.match.params.userId);
							props.history.push('/distributor/snd/field/' + props.match.params.userId)

						}}
					>

						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Journey Plan" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/field/' + props.match.params.userId ?
								props.getCustomerOfAgent(props.match.params.userId) : props.getCustomerOfAgent(props.match.params.userId); props.history.push('/distributor/snd/field/' + props.match.params.userId)
						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="View Journey Plan" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={() => toggleDrawerListItems('reportsManage')}
			>
				<ListItemIcon>
					<PersonIcon style={{ color: 'white' }} />
				</ListItemIcon>
				<ListItemText primary="Reports" style={{ marginLeft: -15 }} />
				{itemopenState.reportsModule ? <ExpandMore /> : <ExpandLess />}
			</ListItem>
			<Collapse in={itemopenState.reportsModule} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/field/' + props.match.params.userId ?
								props.fetchDistributoAgentCustomer(props.match.params.userId) : props.fetchDistributoAgentCustomer(props.match.params.userId);
							props.history.push('/distributor/snd/reports/' + props.match.params.userId)

						}}
					>

						<ListItemIcon>
							<PersonAddIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Sale Agents Orders Report" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/reports/' + props.match.params.userId ?
								props.getCustomerOfAgent(props.match.params.userId) : props.getCustomerOfAgent(props.match.params.userId); props.history.push('/distributor/snd/field/' + props.match.params.userId)
						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Weekly Report of Sales Agent" />
					</ListItem>

					<ListItem button className={classes.nested}
						onClick={() => {
							window.location.pathname === '/distributor/snd/reports/' + props.match.params.userId ?
								props.getCustomerOfAgent(props.match.params.userId) : props.getCustomerOfAgent(props.match.params.userId); props.history.push('/distributor/snd/field/' + props.match.params.userId)
						}}>

						{/* // props.GetUsertoRole(props.match.params.id)://props.L */}
						{/* // props.GetUsertoRole(props.match.params.id); props.history.push('/distributor/snd/product/'+props.match.params.id) }}> */}
						<ListItemIcon>
							<ViewListIcon style={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText primary="Monthly Report of Sales Agent" />
					</ListItem>
				</List>
			</Collapse>

		</List>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: 'white', color: 'grey' }}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
						Sales & distribution
						{/* width is {props.width} */}
					</Typography>
					<CustomizedMenus />
				</Toolbar>
			</AppBar>

			<AppBar style={{
				marginTop: props.width === 'xs' ? headerMargin - 10 : headerMargin,
				paddingTop: 3, paddingBottom: 3, backgroundColor: '#f5f5f5', color: '#2e7d32'
			}} className={classes.appBar}
				elevation={1}>
				{/* <Toolbar variant="dense">
					<div>{'/distributor/snd/dashboard/' + props.match.params.userId}
					
						{(() => {
							if (window.location.pathname === '/distributor/snd/dashboard/' + props.match.params.userId) {
								alert("me called")
								return <Typography variant="h6">Dashboard</Typography>
							}
							else if (props.users_Status === Users_Status.NEWRole) {

								return <Typography variant="h6">Create Role</Typography>
							}
							else if (props.users_Status === Users_Status.SHOWROLE) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Role</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											props.LoadNewRole(); //props.history.push('/distributor/snd/roles/createRole/'+props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}
							else if (props.users_Status === Users_Status.NEW) {

								return <Typography variant="h6">New User</Typography>
							}
							else if (props.saleOrder_Status === SaleOrder_Status.NEW) {

								return <Typography variant="h6">Journey Plan</Typography>
							}
							else if (props.users_Status === Users_Status.SHOW) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show User</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/users/' + props.match.params.userId ?
												//props.LoadNewUser():
												props.FetchRolesbyDistributor(props.match.params.userId) :
												props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							} else if (props.products_status === Products_Status.SHOW) {
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Products</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/products/' + props.match.params.userId
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							} else if (props.products_status === Products_Status.NEW) {
								return <Typography variant="h6">Add Product</Typography>
							} else if (props.inventory_status === Inventory_Status.NEW) {
								// return <Typography variant="h6">Add Inventory</Typography>	
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Add Inventory</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/inventory/' + props.match.params.userId
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}
							else if (props.inventory_status === Inventory_Status.SHOW) {
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Inventory</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/inventory/' + props.match.params.userId
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							} else if (props.order_status == Order_Status.SHOW) {
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show SalesOrders</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/salesorder/' + props.match.params.userId
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							} else if (window.location.pathname === '/distributor/snd/merchandising/definition') {
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Definition</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/merchandising/definition'
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							} else if (window.location.pathname === '/distributor/snd/merchandising/viewplanograms') {
								<Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >View Planograms</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/merchandising/viewplanograms'
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}

						})}


					</div>


				</Toolbar> */}
				<Toolbar variant="dense">
					<div>
						{/* {props.products_Status} and {Users_Status.NEW} */}
						{(() => {

							if (window.location.pathname === '/distributor/snd/dashboard/' + props.match.params.userId) {
								//		alert("called"+window.location.pathname)
								return <Typography variant="h6">Dashboard</Typography>
							}
							else if (window.location.pathname == ('/distributor/snd/roles/' + props.match.params.userId) && props.users_Status === Users_Status.NEWRole) {
								return <Typography variant="h6">Create Role</Typography>
							}
							else if (window.location.pathname == ('/distributor/snd/roles/' + props.match.params.userId) && props.users_Status === Users_Status.SHOWROLE) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Role</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											props.LoadNewRole(); //props.history.push('/distributor/snd/roles/createRole/'+props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}
							else if (window.location.pathname == ('/distributor/snd/users/' + props.match.params.userId) && props.users_Status === Users_Status.NEW) {

								return <Typography variant="h6">New User</Typography>
							}
							else if (props.users_Status === Users_Status.SHOW) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show User</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											window.location.pathname == '/distributor/snd/users/' + props.match.params.userId ?
												//props.LoadNewUser():
												props.FetchRolesbyDistributor(props.match.params.userId) :
												props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}

							else if (window.location.pathname == ('/distributor/snd/products/' + props.match.params.userId) && props.products_Status === Products_Status.NEW) {

								return <Typography variant="h6">New Product</Typography>
							}
							else if (window.location.pathname == ('/distributor/snd/products/' + props.match.params.userId) && props.products_Status === Products_Status.SHOW) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Product</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											//	window.location.pathname == '/distributor/snd/products/' + props.match.params.userId ?
											//props.LoadNewUser():
											props.PostProduct()// : null
											//props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}

							else if (window.location.pathname == ('/distributor/snd/inventory/' + props.match.params.userId) && props.inventory_Status === Inventory_Status.NEW) {

								return <Typography variant="h6">New Inventory</Typography>
							}
							else if (window.location.pathname == ('/distributor/snd/inventory/' + props.match.params.userId) && props.inventory_Status === Inventory_Status.SHOW) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Show Inventory</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
										onClick={() => {
											//	window.location.pathname == '/distributor/snd/products/' + props.match.params.userId ?
											//props.LoadNewUser():
											props.PostProduct()// : null
											//props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
										}
										}>
										<AddIcon />
									</Fab></Grid></Grid>
							}
							else if (window.location.pathname == ('/distributor/snd/salesorder/' + props.match.params.userId)) {
								//alert("called"+window.location.pathname)
								return <Typography variant="h6">Sale Order</Typography>
							}
							else if (window.location.pathname == '/distributor/snd/merchandising/definition') {

								return <Typography variant="h6">Merchandising</Typography>
							}
							// else if (window.location.pathname == ('/distributor/snd/merchandising/definition') && props.products_Status === Products_Status.SHOW) {

							// 	return <Grid container direction="row" spacing={2} justify='flex-start'
							// 		alignItems="center">
							// 		<Grid item><Typography variant="h6"  >Show Product</Typography> </Grid>
							// 		<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
							// 			onClick={() => {
							// 				//	window.location.pathname == '/distributor/snd/products/' + props.match.params.userId ?
							// 				//props.LoadNewUser():
							// 				props.PostProduct()// : null
							// 				//props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
							// 			}
							// 			}>
							// 			<AddIcon />
							// 		</Fab></Grid></Grid>
							// }

							else if (window.location.pathname == ('/distributor/snd/field/' + props.match.params.userId) && props.saleOrder_Status === SaleOrder_Status.NEW) {
								return <Typography variant="h6">Create Journey Plan</Typography>
							}
							else if (window.location.pathname == ('/distributor/snd/field/' + props.match.params.userId) && props.saleOrder_Status === SaleOrder_Status.SHOWAGENTCUST) {

								return <Grid container direction="row" spacing={2} justify='flex-start'
									alignItems="center">
									<Grid item><Typography variant="h6"  >Journey Plan</Typography> </Grid>
									<Grid item> <Fab style={{ backgroundColor: '#2e7d32', color: 'white' }} size="small" className={classes.fab}
									// onClick={() => {
									// 	//	window.location.pathname == '/distributor/snd/products/' + props.match.params.userId ?
									// 	//props.LoadNewUser():
									// 	props.history.push('/distributor/snd/field/' + props.match.params.userId)// : null
									// 	//props.FetchRolesbyDistributor(props.match.params.userId); props.history.push('/distributor/snd/users/' + props.match.params.userId)
									// }
									// }
									>
										<AddIcon />
									</Fab></Grid></Grid>
							}

						})()}


					</div>


				</Toolbar>
			</AppBar>
			<nav className={classes.drawer}

				aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{/* <NestedList /> */}
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer classes={{ paper: classes.drawerPaper, }}
						variant="permanent"
						open  >
						{/* <NestedList /> */}
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{(() => {
					if (window.location.pathname === '/distributor/snd/dashboard/' + props.match.params.userId) {
						return <ChartContainer />
					} else if (window.location.pathname == '/distributor/snd/merchandising/definition') {
						return <ViewPlanogram />
					} else if (window.location.pathname == '/distributor/snd/merchandising/viewplanograms') {
						return <ViewPlanogram />
					}
					else {
						return getScreen;
					}
				})()}
				{/* {window.location.pathname === '/distributor/snd/dashboard/'+props.match.params.userId ? <ChartContainer /> : getScreen} */}
			</main>
		</div>
	);
}

DashboardDis.propTypes = {
	container: PropTypes.object,
};

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(withWidth()(DashboardDis)))