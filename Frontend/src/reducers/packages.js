import {Packages_Action,Packages_Status} from '../constants/packagesActions'
//import {fetchPackage} from '../actions/packagesActions'
const initialState={
    packages_status:Packages_Status.SHOW,
    packagesList:[],
    package:{}
}

export default function(state=initialState, action){
    
    switch (action.type) {
        case Packages_Action.NEW:
            return {...state,packages_status:Packages_Status.NEW}
        case Packages_Action.LOADSHOW:     
            return {...state,packages_status:Packages_Status.LOADSHOW}
       case Packages_Action.UPDATED:
            return {...state,packages_status:Packages_Status.UPDATED,packagesList:action.packageList}
       case Packages_Action.UNDERUPDATE:
            return {...state,packages_status:Packages_Status.UNDERUPDATE,package:action.package}
        case Packages_Action.SHOW:    
            return {...state,packages_status:Packages_Status.SHOW,packagesList:action.packageList}
        case Packages_Action.SUCCESS:
            return {...state,packages_status:Packages_Status.SUCCESS}
        default:
            return {...state}
            
    }
}