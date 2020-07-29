import { Products_Action, Products_Status } from '../constants/productActions'

const initialState = {
    products_status: Products_Status.SHOW,
    products: [],
    product: {}
}

export default function (state = initialState, action) {
    console.log('im in reducer ');
    //  alert("in product reducer" + action.type)
    switch (action.type) {
        case Products_Action.SHOW:
            return { ...state, products_status: Products_Status.SHOW, products: action.payload }
        case Products_Action.NEW:
            console.log("i'm in type new")
            return { ...state, products_status: Products_Status.NEW, product: action.payload }
        case Products_Action.DELETE:
            return { ...state, products_status: Products_Status.SHOW, products: action.payload }
        case Products_Action.UNDERUPDATE:
            //  alert("i m in edit reducer");
            return { ...state, products_status: Products_Status.SHOW, product: action.payload }
        default:
            return state;
    }
}