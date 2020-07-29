import { Products_Action, Products_Status } from "../constants/productActions";
import { createGenerateClassName } from "@material-ui/styles";
import { CLIENT_RENEG_LIMIT } from "tls";
import ROOT_URL from '../constants/config';

export const PostProduct = (productName, price, category, companyName, primaryunit, secondaryUnit, expiryDate,

    distId, imageUrl) => dispatch => {
        var prodData = {
            'name': productName, 'price': parseInt(price), 'category': category, 'company': companyName,
            'primaryUnit': parseInt(primaryunit), 'secondaryUnit': parseInt(secondaryUnit),
            'expiryDate': "2018-03-29T13:34:00.000",//Date.parse(expiryDate),
            'DistributorId': parseInt(distId), 'imageUrl': imageUrl
        }

        fetch(ROOT_URL+'/api/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            mode: 'cors',
            body: JSON.stringify(prodData)
        }).then((response) => {
            console.log(response.status + "response");
            console.log("i'm in postproduct action")
            response.json().then(data => {
                if (data.productStatus == 'CreatedSuccess') {
                    return dispatch({ type: Products_Action.NEW, payload: data.allProducts })
                }
            })
        })
    }





export const fetchProducts = (distId) => dispatch => {
   // alert("fetch end hit"+distId)
    var prodData = {
         'DistributorId': parseInt(distId)
    }
    fetch(ROOT_URL+'/api/products/SpecificDistProd', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            mode: 'cors',
            body: JSON.stringify(prodData)
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
           alert("server error")
        }
        else {
            response.json().then(data => {
              //   alert("jbgjed"+data.allProducts.length);
                return dispatch({ type: Products_Action.SHOW, payload: data.products })
            }
            )
        }
    }).catch(error => alert(error));

}

export const deleteProduct = (id) => dispatch => {
    fetch(ROOT_URL+'/api/products/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 500) {
            // alert("Internal Server Error")
        }
        else {
            response.json().then(data => {
                return dispatch({ type: Products_Action.DELETE, payload: data.allProducts })
            })
        }
    }).catch(error => alert(error))
}


export const fetchProductbyId = (id) => dispatch => {
    fetch(ROOT_URL+'/api/products/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
            // alert("server error")
        }
        else {
            response.json().then(data => {
                return dispatch({ type: Products_Action.UNDERUPDATE, payload: data })
            })
        }
    }).catch(error => alert(error))
}

export const updateProduct = (id, productName, price, category, primaryunit, scondaryUnit, expiryDate) => dispatch => {
    var prodData = {
        'Id': id,
        'Name': productName, 'Price': parseInt(price), 'Category': parseInt(category),
        'PrimaryUnit': parseInt(primaryunit), 'ScondaryUnit': parseInt(scondaryUnit),
        'ExpiryDate': Date.parse(expiryDate)
    }

    fetch(ROOT_URL+'/api/products/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(prodData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            return dispatch({ type: Products_Action.UNDERUPDATE, payload: data.allProducts })
        })
    })
}
