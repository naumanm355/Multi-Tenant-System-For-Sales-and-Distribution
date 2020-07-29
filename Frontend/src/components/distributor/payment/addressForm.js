import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {
	const [disDetail, setDetail] = useState({
		FirstName: '', LastName: '',
		Email: '', Contact: '', Address: '', PostalCode: 0, Country: '', Province: '', Store: '', City: ''
	})
	useEffect(() => {

		//alert("me called")
	});
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Registration
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="First name"
						fullWidth
						autoComplete="fname"
						onChange={(event) => setDetail({ ...disDetail, FirstName: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Last name"
						fullWidth
						autoComplete="lname"
						onChange={(event) => setDetail({ ...disDetail, LastName: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="email"
						name="email"
						label="Enter  Email"
						fullWidth
						autoComplete="email"
						onChange={(event) => setDetail({ ...disDetail, Email: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="contact"
						name="contact"
						label="contact"
						fullWidth
						autoComplete="contact"
						onChange={(event) => setDetail({ ...disDetail, Contact: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address"
						name="address"
						label="Address line "
						fullWidth
						autoComplete="billing address-line"
						onChange={(event) => setDetail({ ...disDetail, Address: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="city"
						name="city"
						label="City"
						fullWidth
						autoComplete="billing address-level2"
						onChange={(event) => setDetail({ ...disDetail, City: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id="state" name="state" label="State/Province/Region" fullWidth />
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="zip"
						name="zip"
						label="Zip / Postal code"
						fullWidth
						autoComplete="billing postal-code"
						onChange={(event) => setDetail({ ...disDetail, PostalCode: event.target.value })}
					/>
				</Grid>

				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="country"
						name="country"
						label="Country"
						fullWidth
						autoComplete="billing country"
						onChange={(event) => setDetail({ ...disDetail, Country: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						id="storeName"
						name="storename"
						label="storeName"
						fullWidth
						autoComplete="storeName"
						onChange={(event) => setDetail({ ...disDetail, Store: event.target.value })}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
						label="Use this address for payment details"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
