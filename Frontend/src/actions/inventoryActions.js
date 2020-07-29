import { Inventory_Action, Inventory_Status } from '../constants/inventoryConstants';
import { createGenerateClassName } from "@material-ui/styles";
import { CLIENT_RENEG_LIMIT } from "tls";
import ROOT_URL from '../constants/config';

export const PostInventory = (Disid, product, TotalPacket_Cartoon, Price) => dispatch => {
    var inventoryData = {
        'DistId': parseInt(Disid),
        'TotalCarton': parseInt(TotalPacket_Cartoon), 'PriceperCarton': parseInt(Price),
        'Name': product.name, 'Category': product.category
    }

    fetch(ROOT_URL+'/api/Inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(inventoryData)
    }).then((response) => {
        console.log(JSON.stringify(response) + "response");
        response.json().then(data => {
            //alert(JSON.stringify(data));
            return dispatch({ type: Inventory_Action.SHOW, payload: data.inventoryList })
            //  return dispatch({ type: Inventory_Action.NEW, payload: data.inventoryList})            
        })
    })
}





export const fetchInventories = (id) => dispatch => {
    fetch(ROOT_URL+'/api/Inventory/' + id, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            // Content-Type: application/json
            'Accept': 'application/json'
            // 'charset': 'UTF-8'
        },
        mode: 'cors'
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 500) {
            // alert("server error")
        }
        else {
            response.json().then(data => {
                console.log(data.inventoryList);
                return dispatch({ type: Inventory_Action.SHOW, payload: data.inventoryList })
            }
            )
        }
    }).catch(error => alert(error));

}

export const deleteInventory = (inventId, distId) => dispatch => {
    alert("delete called action" + 'invent id' + inventId)
    fetch(ROOT_URL+'/api/Inventory/' + inventId + '/' + distId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status + "response" + "stattus text is" + response.statusText);
        if (response.status === 404) {
            //alert("server error")
        }
        else {
            response.json().then(data => {

                return dispatch({ type: Inventory_Action.DELETE, payload: data.inventoryList })
            })
        }
    }).catch(error => alert(error))
}


export const fetchInventorybyId = (inventoryId) => dispatch => {
    const postProd = fetch(ROOT_URL+'/api/inventory/' + inventoryId, {
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
                return dispatch({ type: Inventory_Action.UNDERUPDATE, payload: data })
            })
        }
    }).catch(error => alert(error))
}

export const updateInventory = (inventoryId, TotalPacket_Cartoon, Price) => dispatch => {
    var prodData = {
        'inventoryId': inventoryId,
        'TotalPacket_Cartoon': TotalPacket_Cartoon, 'Price': parseInt(Price),
    }

    const postProd = fetch(ROOT_URL + '/inventory/' + inventoryId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(prodData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            //  console.log(data.status+"data")

            return dispatch({ type: Inventory_Action.SHOW, payload: data })

        })
    })
}
