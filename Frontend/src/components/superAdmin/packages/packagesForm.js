import React,{useState} from 'react'
//import 'materialize-css/dist/css/materialize.min.css'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  textField: {
  //  marginBottom:-30
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
  button:{
paddingLeft:40,
paddingRight:40
  },
  inputsWidth:{
    [theme.breakpoints.between('sm','xs')]: {
      backgroundColor: 'red',
    },
  },
  formControl: {
    //margin: theme.spacing(3),
  },
}));
export default function PackagesForm(props){
const[Value,setvalue]=useState('--select')

const [state, setState] = React.useState({
  gilad: true,
  jason: false,
  antoine: false,
});
const classes = useStyles();
const handleChange = name => event => {
  setState({ ...state, [name]: event.target.checked });
};

const { gilad, jason, antoine } = state;
return (
    <div style={{textAlign:"center",overflowX:'hidden'}}>
      
   <Grid  container direction="row"
   style={{padding:20}} justify="center"
  alignItems="center" spacing={4}>
  
   <Grid container item lg={8} md={12} sm={12} xs={12}  alignItems="center"
   >
 <Grid item lg={6} md={6}  sm={12}  xs={12} >
      {/* <FormControl style={{width:250,marginTop:16}} >
     
          <Select   
          onChange={(event)=>setvalue(event.target.value)}
            value={Value} >
              <MenuItem value='select package'><em>--Select--</em></MenuItem>
              <MenuItem value='basic'>basic</MenuItem>
              <MenuItem value='gold'>gold</MenuItem>
              <MenuItem value='premium'>premium</MenuItem>
                   
          </Select>
        
        </FormControl> */}
            <TextField style={{width:250}}
        id="standard-with-placeholder"
        label="Package Price"
      //  placeholder="P"
        className={classes.textField}
       
      />
        </Grid>
       
        <Grid item lg={6} md={6}  sm={12}  xs={12} >
        <TextField style={{width:250}}
        id="standard-with-placeholder"
        label="Package Price"
      //  placeholder="P"
        className={classes.textField}
       
      />
    </Grid>
        </Grid>
        <Grid item container lg={12} justify="center">
<Grid item lg={4} md={5}  sm={6}  xs={12}>

        <FormControl component="fieldset" className={classes.formControl}>
       <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
            label="Customer"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
            label="FieldManagement"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
            }
            label="Payment"
          />
           <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
            }
            label="InventoryManagement"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      </Grid>
     
      <Grid item lg={4} md={5} sm={6} xs={12}>
      <FormControl component="fieldset" className={classes.formControl}>
        {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
            label="Agent Management"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
            label="Report"
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
            }
            label="Product Managament"
          />
           <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
            }
            label={<Typography>Sale Order Management</Typography>}//"Sale Order Management"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      </Grid>   
      </Grid>
      </Grid>
      <Button variant="contained" color="primary" className={classes.button}
      onClick={()=>props.showPackage()}>
        Primary
      </Button>
{/* <Container maxWidth="md">
<Grid container spacing={12}>
<Grid item lg={4} md={2} sm={4}>
<FormControl style={{width:250,marginTop:16}} >
     
     <Select     //  onChange={this.handleChange('category')}
     onChange={(event)=>setvalue(event.target.value)}
       value={Value} >
         <MenuItem value='select package'><em>--Select--</em></MenuItem>
         <MenuItem value='basic'>basic</MenuItem>
         <MenuItem value='gold'>gold</MenuItem>
         <MenuItem value='premium'>premium</MenuItem>
              
     </Select>
   
   </FormControl> 
   </Grid>
   <Grid item lg={4} md={2} sm={4}> <FormControl style={{width:250,marginTop:16}} >
     
     <Select     //  onChange={this.handleChange('category')}
     onChange={(event)=>setvalue(event.target.value)}
       value={Value} >
         <MenuItem value='select package'><em>--Select--</em></MenuItem>
         <MenuItem value='basic'>basic</MenuItem>
         <MenuItem value='gold'>gold</MenuItem>
         <MenuItem value='premium'>premium</MenuItem>
               {/* {this.state.allFlights.map((flight) => {
                 return <MenuItem value={flight}>{flight}</MenuItem>
               })} 
     </Select>
   
   </FormControl>
   </Grid></Grid>
</Container> */}
    </div>
    )}
     


      

