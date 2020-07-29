import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/other/home';
import PackagesView from './components/superAdmin/packages/packages_View'
import ShowPackages from './components/superAdmin/packages/showPackage'
import CreatePackage from './components/superAdmin/packages/createPackage'
import CheckOut from './components/distributor/payment/checkOut.js';
import SignInView from './components/other/account/signIn/signIn_View'
import paymentView from './components/distributor/payment/payment_View'
import Dashboard from './components/superAdmin/dashboard/dashboard';
import DashboardDis from './components/distributor/dashboard/dashboard';
import ShowUsers from './components/distributor/users/showUsers';
import UsersView from './components/distributor/users/usersView';
import Contact from './components/other/contact';
import SimpleAppBar from './components/other/layouts/appBar.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from './components/other/layouts/footer.js';
import CreateUser from './components/distributor/users/createUsers';
import CreateRole from './components/distributor/Roles/createRole'
import ShowRole from './components/distributor/Roles/showRoles'
import RolesView from './components/distributor/Roles/rolesView'
import ShowPackageUser from './components/other/pricing'
import NestedList from './components/distributor/dashboard/DropDownMenu';
import Features from './components/other/features.js';
import ShowDistributor from './components/superAdmin/showUsers'
import ProductsView from './components/distributor/productManagement/products_view'
import AddInventory from './components/distributor/inventoryManagement/addInventory';
import TextInventory from './components/distributor/inventoryManagement/textInventory';
import InventoryView from './components/distributor/inventoryManagement/inventory_view';
import SalesOrderView from './components/distributor/SalesOrderManagement/salesOrderView';
import Definition from './components/distributor/Merchandising/Planograms/definition';
import ViewPlanogram from './components/distributor/Merchandising/Planograms/viewPlanograms';
import test from './components/distributor/productManagement/test'
import FieldView from './components/distributor/FieldManagement/Field_view'
import assignLocation from './components/distributor/FieldManagement/googleMap'

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/contact"
				render={() => {
					return (
						<div>
							<CssBaseline />
							<SimpleAppBar />
							<Contact />
							<Footer />
						</div>
					);
				}}
			/>
			<Route
				exact
				path="/features"
				render={() => {
					return (
						<div><CssBaseline />
							<SimpleAppBar />
							<Features />
							<Footer />
						</div>
					);
				}}
			/>
			<Route
				exact
				path="/pricing"
				render={() => {
					return (
						<div>
							<SimpleAppBar />
							<br />
							<ShowPackageUser />
							<Footer />
						</div>
					);
				}}
			/>
			{/***************************** admin ******************************/}
			<Route exact path="/admin/snd" component={SignInView} />
			<Route exact path="/admin/snd/dashboard" component={Dashboard} />
			<Route exact path="/admin/snd/packages" component={PackagesView} />
			<Route exact path="/admin/snd/Users" component={Dashboard} />

			{/***************************** distributor ******************************/}
			<Route exact path="/distributor/sigin" component={SignInView} />
			<Route exact path="/distributor/snd/New" component={NestedList} />
			{/* <Route exact path="/addinventory" component={AddInventory} /> */}
			{/* <Route exact path="/textinventory" component={TextInventory} /> */}
			<Route exact path="/signupandpayment" component={paymentView} />
			<Route exact path="/distributor/snd/dashboard/:userId" component={DashboardDis} />
			<Route exact path="/distributor/snd/users/:userId" component={UsersView} />
			<Route exact path="/distributor/snd/products/:userId" component={ProductsView} />
			<Route exact path="/distributor/snd/inventory/:userId" component={InventoryView} />
			<Route exact path="/distributor/snd/showinventory" component={InventoryView} />
			<Route exact path="/distributor/snd/salesorder/:userId" component={SalesOrderView} />
			<Route exact path="/distributor/snd/field/:userId" component={FieldView} />
			{/* <Route exact path= "/distributor/snd/reports/:userId" component = {ReportsView} /> */}
			{/* <Route exact path="/distributor/snd/users/showUser/:userId" component={UsersView} /> */}
			{/* <Route exact path="/distributor/snd/users/createUser/:userId" component={UsersView} /> */}
			<Route exact path="/distributor/snd/roles/:userId" component={RolesView} />
			{/* <Route exact path="/distributor/snd/roles/:userId" component={RolesView} /> */}
			<Route exact path="/distributor/snd/merchandising/definition" component={DashboardDis} />
			<Route exact path="/distributor/snd/merchandising/viewplanograms" component={DashboardDis} />
			<Route exact path="/test" component={test} />
		</Switch>
	</BrowserRouter>
);
export default Root;
