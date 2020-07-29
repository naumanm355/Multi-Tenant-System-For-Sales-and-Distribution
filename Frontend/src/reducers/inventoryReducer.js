import { Inventory_Action, Inventory_Status } from '../constants/inventoryConstants';

const initialState = {
    inventory_status: Inventory_Status.SHOW,
    inventory: {},
    inventories: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case Inventory_Action.SHOW:
            // alert("me called")
            return { ...state, inventory_status: Inventory_Status.SHOW, inventories: action.payload }
        case Inventory_Action.NEW:
            // alert('i m in add inventory reducer action')
            return { ...state, inventory_status: Inventory_Status.NEW, inventory: action.payload }
        case Inventory_Action.DELETE:
            //alert("I'm in delete reducer")
            return { ...state, inventory_status: Inventory_Status.SHOW, inventory: action.payload }
        case Inventory_Action.UNDERUPDATE:
            return { ...state, inventory_status: Inventory_Status.UNDERUPDATE, inventory: action.payload }
        default:
            return state;
    }

}