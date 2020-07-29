import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {storage} from '../../../config/fbconfig'
import Select from '@material-ui/core/Select';
import ProductsView from './products_view';
// import {PostProduct, fetchProducts} from '../../../actions/productActions';
import TextField from '@material-ui/core/TextField';
import { Link,withRouter } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(7, 7,4,7),
       
        marginTop:60,
	//	padding: theme.spacing(2,3,3,3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(7, 4,4,4),
        },
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
 function AddPrdoduct(props) {
    const classes = useStyles();
    const [progress, setProgress]=useState(0);
    const [showProgress, setshowProgress]=useState(false);
    const [productObj, setProductAttribute] = useState({Name:'', Price:0, Category: '',Company: '', PrimaryUnit:'', ScondaryUnit:'',
    ExpiryDate: null}); 
    // alert("in add "+props.distId)
    const [imageObj, handleImageChange] = useState({image:null, imageUrl: 'ljge', progress: 0});
    useEffect(() => {
    
        if(props.prod!==undefined){
            setProductAttribute({Name:props.prod.name,Price:props.prod.price,Category:props.prod.category, Company: props.prod.company,
            PrimaryUnit:props.prod.primaryunit,SecondaryUnit:props.prod.scondaryUnit, ExpiryDate:props.prod.expiryDate})
        }
      }, []);  //here if [] used mean render only first else render on state change 
      const handleChange = (event) => {
          if (event.target.files[0]) {
            //  const newimage = event.target.files[0]
            //  const image = imageObj.image = newimage
              handleImageChange({image:event.target.files[0]})
              console.log(imageObj.image)
          }
      }
      const handleUpload = () => {
        const image = imageObj.image
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log(image.name);
        uploadTask.on('state_changed',
        (snapshot) => {
            const newprogress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            //const progress = imageObj.progress = newprogress
            handleImageChange({...imageObj,progress:newprogress})
        },
        (error) => {
            console.log(error)
        }, 
        () => {
            storage.ref('images').child(image.name).getDownloadURL().then(imageurl => {
                //const url = imageObj.imageUrl = imageUrl;
                handleImageChange({...imageObj,imageUrl:imageurl})
                console.log(imageurl) 
            })
        });
      }
      
    //  const handleUpload =() =>{
    // //   const {image} = this.state;
    //     const uploadTask = storage.ref(`images/${productObj.imageUrl.name}`).put(productObj.imageUrl);
    //     uploadTask.on('state_changed', 
    //     (snapshot) => {
    //       // progrss function ....
    //       const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //     //   this.setState({
    //         setProgress(progress)
    //         setshowProgress(true)
    //     //   });
    //     }, 
    //     (error) => {
    //          // error function ....
    //       console.log(error);
    //     }, 
    //   () => {
    //       // complete function ....
    //       storage.ref('images').child(productObj.imageUrl.name).getDownloadURL().then(imageUrl => {
    //           console.log("Image url",imageUrl);
    //           this.setState({imageUrl});
    //       })
    //   });
    //  }
    return (
        <div style={{textAlign:'center'}}>
            
            <Paper className={classes.root} >
      {props.prod!==undefined?
      
      <div>
        
      <Grid container spacing={3} justify="center"
      alignItems="center" >
          <LinearProgress color="secondary" variant="determinate" value={progress} />
          <input type="file" id="imgupload" style={{margin:10,cursor:'pointer'}} onChange={this.handleChange}/>
          <button style={{cursor:'pointer',}} type="button" onClick={this.handleUpload}>Upload</button>
          <Grid item lg={6} md={6} xs={12}>
              <TextField  fullWidth label="Product Name" className={classes.textField}
              value={productObj.Name}
              
              onChange={(event)=>setProductAttribute({...productObj,Name:event.target.value})} />
          </Grid>
          <Grid item lg={6} md={6}  xs={12}>
              <TextField value={productObj.Price}
               fullWidth label="Price" className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj,Price:event.target.value})}/>
          </Grid>
{/* Starts from there */}
          <Grid item lg={4} md={4} xs={12}>
              <TextField  value={productObj.Category}
              fullWidth label="Category" className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj,Category:event.target.value})}/>{' '}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
              <TextField  value={productObj.Company}
              fullWidth label="Company" className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj,Company:event.target.value})}/>{' '}
          </Grid>
          <Grid item lg={4} md={4}  xs={12}>
              <TextField  fullWidth label="Primary Unit" 
              value={productObj.PrimaryUnit}
              className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj,PrimaryUnit:event.target.value})}/>
          </Grid>
          <Grid item lg={4} md={4}  xs={12}>
              <TextField  fullWidth label="Scondary Unit" 
              value={productObj.ScondaryUnit}
              className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj,ScondaryUnit:event.target.value})}/>
          </Grid>
        <Grid item lg={4} md={4} xs={12}>
              <TextField value={productObj.ExpiryDate}
               fullWidth label="Expiry Date" className={classes.textField} 
              onChange={(event)=>setProductAttribute({...productObj, ExpiryDate:event.target.value})}/>
          </Grid>
         
              <input type = "file"
               fullWidth label="imageFile" className={classes.textField} 
              onChange={(event) => 
                handleChange(event)
                }
              />      
          <Grid item>
            <Button alignItems="center" variant="contained" color="secondary" disabled={true}
                onClick={() => handleUpload()}
                  >
          
              Upload Image
            </Button>
          </Grid>
          
      
      </Grid>
      <br />  <br /> 
          <Grid container spacing={2} justify='flex-start'>
          <Grid item>
      <Button alignItems="center" variant="contained" color="default"
      onClick={()=>props.fetchProducts(props.distId)}>
          
              Cancel
          </Button>
          </Grid>
      <Grid item>
         
      <Button alignItems="center" variant="contained" color="primary" disabled={true}
      onClick={()=>props.PostProduct(productObj.Name, productObj.Price, productObj.Category, productObj.Company,
        productObj.PrimaryUnit, productObj.ScondaryUnit, productObj.ExpiryDate, imageObj.imageUrl)}>
    
              Save as New 
          </Button>
          </Grid>
          <Grid item     >
              <Button alignItems="center" variant="contained" color="primary"
               onClick={()=>props.updateProduct(props.prod.id, productObj.Name, productObj.Price, productObj.Category, productObj.Company,
                productObj.PrimaryUnit, productObj.ScondaryUnit, productObj.ExpiryDate, imageObj.imageUrl)}
              >
          
              Save
          </Button>
          </Grid>
          </Grid>
          </div>:
          <div>
          <Grid container spacing={3} justify="center"
          alignItems="center" >
              <Grid item lg={6} md={6} xs={12}>
                  <TextField  fullWidth label="Name" className={classes.textField}
                  
                  onChange={(event)=>setProductAttribute({...productObj,Name:event.target.value})} />
              </Grid>
              <Grid item lg={6} md={6}  xs={12}>
                  <TextField  fullWidth label="Price" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj,Price:event.target.value})}/>
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                  <TextField  fullWidth label="Category" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj,Category:event.target.value})}/>{' '}
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                  <TextField  fullWidth label="Company" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj,Company:event.target.value})}/>{' '}
              </Grid>
              <Grid item lg={4} md={4}  xs={12}>
                  <TextField  fullWidth label="PrimaryUnit" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj,PrimaryUnit:event.target.value})}/>
              </Grid>
            <Grid item lg={4} md={4} xs={12}>
                  <TextField  fullWidth label="Scondary Unit" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj,SecondaryUnit:event.target.value})}/>
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                  <TextField  fullWidth label="Expiry Date" className={classes.textField} 
                  onChange={(event)=>setProductAttribute({...productObj, ExpiryDate:event.target.value})}/>
              </Grid>
              <input type = "file"
               fullWidth label="imageFile" className={classes.textField} 
              onChange={(event)=> 
                // setProductAttribute({...productObj, imageUrl:event.target.value})
                handleChange(event)
                }
              />      
          <Grid item>
            <Button alignItems="center" variant="contained" color="secondary" disabled={false}
                onClick={
                      () => handleUpload()}>
          
              Upload Image
            </Button>
          </Grid>
          
          </Grid>
          <br />  <br /> 
              <Grid container spacing={2} justify='flex-start'>
              <Grid item>
          <Button alignItems="center" variant="contained" color="default"
          onClick={()=>props.fetchProducts(props.distId)}>
              
                  Cancel
              </Button>
              </Grid>
          <Grid item> 
       
          <Button alignItems="center" variant="contained" color="secondary"
          onClick={()=>props.PostProduct(productObj.Name, productObj.Price, productObj.Category, productObj.Company,
            productObj.PrimaryUnit, productObj.SecondaryUnit, productObj.ExpiryDate,props.distId, imageObj.imageUrl)}>
              
                  Save as New
              </Button>
              </Grid>
              <Grid item     onClick={()=>props.showProduct()}>
                  <Button alignItems="center" variant="contained" color="primary"
                  disabled={true}
                  >
              
                  Save
              </Button>
              </Grid>
              </Grid>
              </div>  }
                
            </Paper>
        </div>
    );
}
export default withRouter(AddPrdoduct)




