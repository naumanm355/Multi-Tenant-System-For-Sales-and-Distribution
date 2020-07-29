import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import SimpleAppBar from '../../other/layouts/appBar';



const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function DistributorSignUp(props) {
    const classes = useStyles();
    const [disDetail,setDetail]=useState({FirstName:'',LastName:'',
    Email:'',Contact:'',Address:'',PostalCode:0,Country:'',Province:'',Store:'',City:''})
    return (
        <React.Fragment>
            <CssBaseline />
            <SimpleAppBar />
            <main className={classes.layout}>
                <Paper className={classes.paper}>

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
                        <div className={classes.buttons}>

                          

                            <Button
                                variant="contained"
                                color="primary"
                              
                             onClick={() => 
                                //props.history.push('/distributor/snd/dashboard')
                                props.signUpDistributor(disDetail)
                            }
                                className={classes.button}
                            >
                                Save
										</Button>
                        </div>
                    </React.Fragment>

                </Paper>
            </main>
        </React.Fragment>
    );
}

export default DistributorSignUp;
