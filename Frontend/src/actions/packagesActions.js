import { Packages_Action } from '../constants/packagesActions'
import ROOT_URL from '../constants/config';
var jwt = require('jsonwebtoken');
var key = "this_is_our_super_long_key_for_token_validation_project_2019_06_28$smesk.in";

export const PostPackage = (packageName, price, totalusers, providedStorage, duration) => dispatch => {

    var packData = {
        'Name': packageName, 'Price': parseInt(price), 'TotalUsers': parseInt(totalusers),
        'Bandwidth': parseInt(providedStorage), 'DurationPerMonth': parseInt(duration)
    }
    //alert(typeof(parseInt(price)))
    const postPack = fetch(ROOT_URL+'/api/Packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(packData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            console.log(data.status + "data")
            if (data.packageStatus == 'CreatedSuccess') {
                return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
            }
            else if (data.packageStatus == 'CreatedFailure') {
                return dispatch({ type: Packages_Action.FAILED })
            }

        })
    })
}


export const fetchPackage = () => dispatch => {
    const postPack = fetch(ROOT_URL+'/api/Packages', {
        method: 'GET',
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
                if (data.packageStatus == 'GetAll') {
                    return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}

export const deletePackage = (id) => dispatch => {
    const postPack = fetch(ROOT_URL+'/api/Packages/' + id, {
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
                if (data.packageStatus == 'DeletedSuccess') {
                    //   alert(data.packages.id)
                    return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}


export const fetchPackagebyId = (id) => dispatch => {
    const postPack = fetch(ROOT_URL+'/api/Packages/' + id, {
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
                if (data.packageStatus == 'GetSpecific') {
                    // alert(data.packages.id)
                    return dispatch({ type: Packages_Action.UNDERUPDATE, package: data.packages })
                }
                else {
                    return dispatch({ type: Packages_Action.FAILED })
                }
            })
        }
    }).catch(error => alert(error))
}

export const updatePackage = (id, packageName, price, totalusers, providedStorage, duration) => dispatch => {
    var packData = {
        'Id': id,
        'Name': packageName, 'Price': parseInt(price), 'TotalUsers': parseInt(totalusers),
        'Bandwidth': parseInt(providedStorage), 'DurationPerMonth': parseInt(duration)
    }

    const postPack = fetch(ROOT_URL+'/api/Packages/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(packData)
    }).then((response) => {
        console.log(response.status + "response");
        response.json().then(data => {
            //  console.log(data.status+"data")
            console.log(data.packageStatus + data.allPackages.length)
            if (data.packageStatus == 'UpdatedSuccess') {
                //this.fetchPackage();
                //  alert("update")
                return dispatch({ type: Packages_Action.SHOW, packageList: data.allPackages })
            }
            else if (data.packageStatus == 'CreatedFailure') {
                return dispatch({ type: Packages_Action.FAILED })
            }

        })
    })
}


