import React, { Component } from 'react';
import { Products_Action, Products_Status } from '../../../constants/productActions';
import ShowProduct from './showProducts';
import AddProduct from './addProduct';
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard';
import { fetchProducts, PostProduct, updateProduct, fetchProductbyId, deleteProduct } from '../../../actions/productActions';
// Map state to props
const mapStateToProps = state => {
    //alert("map state"+JSON.stringify(state.product_Reducer.product))
    return {
        productsList: state.product_Reducer.products,
        product: state.product_Reducer.product,
        products_status: state.product_Reducer.products_status
    }
}
// Map Dispatch to Props
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: (distId) => { dispatch(fetchProducts(distId)) },
        PostProduct: (productName, productPrice, productCategory, productCompany, primaryUnit, scondaryUnit, expiryDate, distId, imageUrl) => {
            dispatch(PostProduct(productName, productPrice, productCategory, productCompany, primaryUnit, scondaryUnit, expiryDate,
                distId, imageUrl))
        },
        createproduct: () => { dispatch({ type: Products_Action.NEW }) },
        fetchProductbyId: (id) => { dispatch(fetchProductbyId(id)) },
        deleteProduct: (id) => { dispatch(deleteProduct(id)) },
        updateProduct: (id, productName, productPrice, productCategory, productCompany, primaryUnit, scondaryUnit, expiryDate, imageUrl) => { dispatch(updateProduct(id, productName, productPrice, productCategory, productCompany, primaryUnit, scondaryUnit, expiryDate, imageUrl)) },
    }
}
class ProductsView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // if(this.props.products_status === 'LOAD_SHOW' || this.props.products_status === 'SHOW_Products') {
        //     this.props.fetchProducts();
        // }
        //alert(this.props.productsList.length+"in did mount")
    }

    getScreen(status) {
        switch (status) {
            case Products_Status.SHOW:
                return <ShowProduct products={this.props.productsList} createproduct={this.props.createproduct} deleteProduct={this.props.deleteProduct} fetchProductbyId={this.props.fetchProductbyId} />
            case Products_Status.NEW:
                //      alert("id is"+)
                console.log("i m in getscreen for add product")
                return <AddProduct fetchProducts={this.props.fetchProducts}
                    distId={this.props.match.params.userId}
                    PostProduct={this.props.PostProduct} updateProduct={this.props.updateProduct} />
            case Products_Status.UNDERUPDATE:
                return <AddProduct prod={this.props.product}
                    updateProduct={this.props.updateProduct} distId={this.props.match.params.userId}
                    fetchProducts={this.props.fetchProducts} PostProduct={this.props.PostProduct}
                />
            default:
        }
    }
    render() {
        return (
            <DashboardDis getScreen={this.getScreen(this.props.products_status)} />)

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsView)
