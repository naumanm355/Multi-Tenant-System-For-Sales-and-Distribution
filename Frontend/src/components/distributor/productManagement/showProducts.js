import React, {Component} from 'react';
import ProductCard from './productCard';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = theme =>({
  card: {
    maxWidth: 345//,
   // minWidth:150
  },
  media: {
    height: 140,
  },
});
class ShowProduct extends Component {
  constructor(props) {
    super(props)
  }
  render() {    
    return (
      <div style={{marginTop:60}}>
      {/* {this.props.products.length} */}
       {/* <Grid style = {{flexGrow: 1}} container spacing={3}> */}
        {/* <Grid item xs>
          {this.props.products.map((product)=>{
            return  <ProductCard products = {product}/>
          })}
        </Grid>         */}
        <Grid item xs={12} >
        <Grid container spacing={3}>        
          {this.props.products.map(product => (
            <Grid key={product.price} item>
              {/* <ProductCard products = {product} deleteProductInCard = {this.props.deleteProduct}/> */}
              
                <Card className={styles.card}>
                  <CardActionArea>
                    <CardMedia
                      style={{ height: "150px" }}
                      className={styles.media}
                      image={product.imageUrl}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {product.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                    <Button size="small" color="primary" onClick = {()=> {
                      this.props.deleteProduct(product.id)
                    }}>
                      Delete
                    </Button>
                    {/* <Button size="small" color="primary">
                      Learn More
                    </Button> */}
                  </CardActions>
                </Card>    
            </Grid>
          ))}
        
        </Grid>
        </Grid>
      {/* </Grid>   */}
      </div>
    );
  }
}
export default ShowProduct;