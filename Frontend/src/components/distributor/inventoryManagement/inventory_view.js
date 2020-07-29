import React, { Component } from 'react';
import { Inventory_Action, Inventory_Status } from '../../../constants/inventoryConstants';
import AddInventory from './addInventory';
import ShowInventories from './showInventory';
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard';
import { fetchInventories, PostInventory, updateInventory, fetchInventorybyId, deleteInventory } from '../../../actions/inventoryActions';


// Map state to props

const mapStateToProps = state => ({
    inventories: state.inventory_Reducer.inventories,
    inventory: state.inventory_Reducer.inventory,
    inventory_status: state.inventory_Reducer.inventory_status

})
// Map Dispatch to Props

const mapDispatchToProps = dispatch => {
    return {
        fetchInventories: (id) => { dispatch(fetchInventories(id)) },
        PostInventory: (Disid, product, TotalPacket_Cartoon, Price) => { dispatch(PostInventory(Disid, product, TotalPacket_Cartoon, Price)) },
        AddInventory: () => { dispatch({ type: Inventory_Action.NEW }) },
        fetchInventorybyId: (inventoryId) => { dispatch(fetchInventorybyId(inventoryId)) },
        deleteInventory: (inventoryId, distId) => { dispatch(deleteInventory(inventoryId, distId)) },
        updateInventory: (inventoryId, TotalPacket_Cartoon, Price) => { dispatch(updateInventory(inventoryId, TotalPacket_Cartoon, Price)) },
    }
}


class InventoryView extends Component {

    constructor(props) {
        super(props);
    }

    getScreen(status) {
        //  alert("status is"+status);
        switch (status) {

            case Inventory_Status.SHOW:
                // alert("this.props.products")
                return <ShowInventories inventorylist={this.props.inventories} addInventory={this.props.AddInventory}
                    deleteInventory={this.props.deleteInventory} distId={this.props.match.params.userId}
                    fetchInventorybyId={this.props.fetchInventorybyId}
                />
            case Inventory_Status.NEW:
                return <AddInventory fetchInventories={this.props.fetchInventories} distId={this.props.match.params.userId} PostInventory={this.props.PostInventory} />
            case Inventory_Status.UNDERUPDATE:
                return <AddInventory invent={this.props.inventories}
                    updateInventory={this.props.updateInventory} distId={this.props.match.params.userId}
                    fetchInventories={this.props.fetchInventories} PostInventory={this.props.PostInventory}
                />
            default:

        }
    }

    render() {
        return (<DashboardDis getScreen={this.getScreen(this.props.inventory_status)} />)

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryView)











