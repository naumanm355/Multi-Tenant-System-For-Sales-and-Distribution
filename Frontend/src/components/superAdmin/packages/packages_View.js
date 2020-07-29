import React,{Component} from 'react'
import {Packages_Action,Packages_Status} from '../../../constants/packagesActions'
import CreatePackage from './createPackage'
import ShowPackages from './showPackage'
import { connect } from 'react-redux';
import Dashboard from '../dashboard/dashboard'
import {PostPackage,fetchPackage,fetchPackagebyId,updatePackage,deletePackage} from '../../../actions/packagesActions'


const mapStateToProps=state=>({
packages_Status:state.packages_Reducer.packages_status,
packagelist:state.packages_Reducer.packagesList,
package:state.packages_Reducer.package
})
const mapDispatchToProps=(dispatch)=>{
    return{
        PostPackage : (packageName, price, totalusers, providedStorage, duration)=>
        {dispatch(PostPackage  (packageName, price, totalusers, providedStorage, duration))},
        fetchPackage:()=>{dispatch(fetchPackage())},
        CreatePackage:()=>{dispatch({type:Packages_Action.NEW})},
        fetchPackagebyId:(id)=>{dispatch(fetchPackagebyId(id))},
        deletePackage:(id)=>{dispatch(deletePackage(id))},
        updatePackage : (id,packageName, price, totalusers, providedStorage, duration)=>
        {dispatch(updatePackage  (id,packageName, price, totalusers, providedStorage, duration))},
    }
}

class PackagesView extends React.Component{
constructor(props){
    super(props);
}

componentDidMount(){
   // alert(this.props.packages_Status);
  //  alert(this.props.packagelist.length);
    if(this.props.packages_Status==='LOAD_SHOW' || this.props.packages_Status==='SHOW_PACKAGES'){
        this.props.fetchPackage();
    }
}
getScreen(status){
    switch (status) {
        
    case Packages_Status.SHOW:
   
       return     <ShowPackages deletePackage={this.props.deletePackage} 
       packagelist={this.props.packagelist}  createPackage={this.props.CreatePackage}
       deletePackage={this.props.deletePackage} fetchPackagebyId={this.props.fetchPackagebyId}
       />
    case Packages_Status.NEW:
       return     <CreatePackage fetchPackage={this.props.fetchPackage} PostPackage={this.props.PostPackage}/>
    case Packages_Status.UNDERUPDATE:
       return     <CreatePackage pack={this.props.package}
       updatePackage={this.props.updatePackage}
       fetchPackage={this.props.fetchPackage} PostPackage={this.props.PostPackage}/>
    default:
        
    }
}
render(){
    return(<div><Dashboard getScreen={this.getScreen(this.props.packages_Status)} /></div>)
}
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesView)