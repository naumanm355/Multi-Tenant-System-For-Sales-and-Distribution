import React, { Component } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import GoogleMap from './googleMap'
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
    root: {
        // padding: theme.spacing(2),
        width: '100%',
        marginTop: 60
    },
    textField: {
        // marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '100%',
    },
    formControl: {
        width: '100%',
    },
    menu: {
        width: '100%',
    },
})

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


const currencies = [
    {
        value: 'UasghdSD',
        label: '$',
    },
    {
        value: 'EasdUR',
        label: '€',
    },
    {
        value: 'BxzcxzcTC',
        label: '฿',
    },
    {
        value: 'JzxcxzczxcxzczxczxzxcxxczxczxczxPY',
        label: '¥',
    },
];
class AssignLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personName: [],
            age: '',
            agentList: [],
            customerList: [],
            startDay: '', endDay: ''
        }
    }
    handleChange = (event) => {

        this.setState({
            age: event.target.value
        })
    };
    handleSelect = (event) => {
        // if (!this.state.personName.includes(event.target.value)) {
        //     this.state.personName.push(event.target.value)
        // }
        this.setState({personName:event.target.value})

    };

    showListitem = () => {
        {
            this.state.personName.map(obj => {
                console.log(obj)
            })
        }
    }
    // componentWillMount() {
    //     this.props.fetchDistributoAgentCustomer(this.props.disId);
    // }
    onChangeGetDate = (event) => {
        this.setState({
            startDay: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        // this.props.distributorUsersList.map(item => {
        //     if (item.roleName == "customer") {
        //         this.state.customerList.push({ id: item.userInfo.id, Name: item.userInfo.firstName + " " + item.userInfo.lastName });
        //     }
        //     else if (item.roleName == "sale agent") {
        //         this.state.agentList.push({ id: item.userInfo.id, Name: item.userInfo.firstName })
        //     }
        // })
        // alert(this.props.agentList.length + " " + this.props.customerList.length);
        // if (this.props.distributorUsersList.length != this.agentList.length) {
        // this.props.distributorUsersList.map(item => {
        //     this.state.agentList.concat(item.roleName)
        // if (item.roleName == "customer") {
        // this.agentList.push(item.userInfo.id)
        // }
        // if (item.roleName == "customer") {
        //     setCustomerList([...customerList, { id: item.userInfo.id, Name: item.userInfo.firstName + " " + item.userInfo.lastName }]);
        // }
        // else if (item.roleName == "sale agent") {
        //     setAgentList([...agentList, { id: item.userInfo.id, Name: item.userInfo.firstName + " " + item.userInfo.lastName }]);
        // }
        // })
        // }
        return (
            <Grid container className={classes.root}>
                <Grid container>
                    <Typography gutterBottom>Agent Information</Typography>
                    <Grid container direction="row" spacing={3} >
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Agents Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                >
                                    {this.props.agentList.map(obj => {
                                        return <MenuItem key={obj.Name} value={obj.Name}>{obj.Name}</MenuItem>
                                    }
                                    )}
                                </Select>
                            </FormControl>

                            <TextField onChange={this.onChangeGetDate} fullWidth label="Start Day" type="date" defaultValue="2017-05-24"
                                className={classes.textField} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-checkbox-label">Customers Name</InputLabel>
                                <Select
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={this.state.personName}
                                    onChange={this.handleSelect}
                                    input={<Input />}
                                    renderValue={selected => selected.join(', ')}
                                >
                                    {this.props.customerList.map(name => (
                                        <MenuItem key={name} value={name.Name}>
                                            <Checkbox //checked={this.state.personName.indexOf(name.Name) > -1} 
                                            />
                                            <ListItemText primary={name.Name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField onChange={(event) => this.setState({ endDay: event.target.value })} fullWidth label="End Day" type="date" defaultValue="2017-05-24"
                                className={classes.textField} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{ width: '100%', marginTop: 20 }}>
                    <GoogleMap />
                </Grid>
                <Grid item style={{ width: '100%', marginTop: 20 }}>
                    <Button alignItems="center" variant="contained" color="default" >
                        CANCEL
                    </Button>
                   
                    <Button alignItems="center" variant="contained" color="secondary" style={{ marginLeft: 10 }}
                      onClick={() => this.props.postAgentCustomer(this.props.disId, this.state.personName, this.state.age, this.state.startDay, this.state.endDay)}
                    
                     //  onClick={() => alert("Added Succesfully...")}>
                      >  SAVE AS NEW
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(useStyles)(AssignLocation)