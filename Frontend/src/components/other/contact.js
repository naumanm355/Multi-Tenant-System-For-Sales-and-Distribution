import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
    borderRadius: 4,
    marginTop: theme.spacing.unit*4,
    marginLeft: theme.spacing.unit*4,
    marginRight: theme.spacing.unit*4,
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    padding: '10px 12px',
  },
  margin: {
    //margin: theme.spacing.unit,
    width:'100%',
    
  },
  marginn: {
    //margin: theme.spacing.unit,
    width:100,
    marginLeft:'40%',
    marginBottom:10
    
  },
  bootstrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    marginTop: theme.spacing.unit*4,
    marginLeft: theme.spacing.unit*4,
    marginRight: theme.spacing.unit*4,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
     // borderColor: '#80bdff',
     // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
});

function Contact(props) {
  const { classes } = props;
  return (
    <div>
       {/* <Typography variant='h4' align="center" gutterBottom>Contact Us</Typography> */}
    <Grid container direction="row"  style={{padding:20
		
		}} spacing={2}>
    <Grid item lg={12} md={12} sm={12}>    <Typography variant='h4' align="center" gutterBottom>Contact Us</Typography></Grid>
    <Grid item md={6} xs={12} style={{backgroundColor:'#efebe9',
    padding:20}}>
	  <Typography variant='h5' align="left" style={{color:'black'}}>Address : </Typography>
	  <Typography variant="h6" align="left" style={{color:'black'}} gutterBottom>Shopping center staff houses engineeringuniverity lahore,Lahore,Punjab,Pakistan</Typography>
	  <Typography variant='h5' align='left' style={{color:'black'}} >Phone : </Typography>
	  <Typography variant='h6' align='left' style={{color:'black'}} gutterBottom>+92-3086415241 </Typography>
	  <Typography variant='h5' align='left' style={{color:'black'}} >Email : </Typography>
	  <Typography variant='h6' align='left' style={{color:'black'}} gutterBottom>numanuet311@gmail.com  </Typography>
	  
	  
	  </Grid>
	   <Grid item md={6} xs={12} //style={{pdding}}
     >
	 
	   <Paper className={classes.root} elevation={1}>
     <Typography variant='h5' align='center' gutterBottom>Contact Form</Typography>
	  <Grid container direction="row" style={{padding:30}}>
	
	  <Grid item xs={12} style={{backgroundColor:'#efebe9'}}>
	  <FormControl className={classes.margin}>
	  <InputBase id="bootstrap-input" placeholder="First Name" required='true' margin="normal"
		classes={{
		  root: classes.bootstrapRoot,
		  input: classes.bootstrapInput,
		}}
	  />

	  <InputBase id="bootstrap-input" placeholder="E-mail Adress" required='true' type="email" margin="normal"
		classes={{
		  root: classes.bootstrapRoot,
		  input: classes.bootstrapInput,
		}}
	  />
	  <InputBase id="bootstrap-input" placeholder="Phone Number"required='true' type="number" margin="normal"
		classes={{
		  root: classes.bootstrapRoot,
		  input: classes.bootstrapInput,
		}}
	  />
    <InputBase id="bootstrap-input" placeholder="Store Name" required='true' margin="normal"
		classes={{
		  root: classes.bootstrapRoot,
		  input: classes.bootstrapInput,
		}}
	  />
    
	  <TextField
		multiline rows="4" placeholder="Message" className={classes.textField} margin="normal"
	  />
	</FormControl>
	
  <Fab variant="extended" color="primary" aria-label="Add" 
   className={classes.marginn}>Send</Fab>
	  </Grid>
	  </Grid>
	</Paper>
	  </Grid> 
	  
	  </Grid>
    </div>
	
  );
}
Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);

// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
// import NavigationIcon from '@material-ui/icons/Navigation';

// const styles = theme => ({
//   fab: {
//     margin: theme.spacing.unit,
//   },
//   extendedIcon: {
//     marginRight: theme.spacing.unit,
//   },
// });

// function FloatingActionButtons(props) {
//   const { classes } = props;
//   return (
//     <div>
//       <Fab color="primary" aria-label="Add" className={classes.fab}>
//         <AddIcon />
//       </Fab>
//       <Fab color="secondary" aria-label="Edit" className={classes.fab}>
//         <Icon>edit_icon</Icon>
//       </Fab>
//       <Fab variant="extended" aria-label="Delete" className={classes.fab}>
//         <NavigationIcon className={classes.extendedIcon} />
//         Extended
//       </Fab>
//       <Fab disabled aria-label="Delete" className={classes.fab}>
//         <DeleteIcon />
//       </Fab>
//     </div>
//   );
// }

// FloatingActionButtons.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(FloatingActionButtons);