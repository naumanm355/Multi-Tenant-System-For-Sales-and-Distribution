import { SignIn_Action } from '../constants/signInActions'
import { object } from 'prop-types';
import ROOT_URL from '../constants/config';
const jwt = require("jsonwebtoken")

// const tokenExpires=300
// const users={
//   username:"numan",password:"123"
// }
// const token=jwt.sign({users},"secret",{
//   algorithm:'HS256',
//   expiresIn:tokenExpires
// })

// console.log("token generated is "+token)

//    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNTY3NzY1NjI3LCJpc3MiOiJzbWVzay5pbiIsImF1ZCI6InJlYWRlcnMifQ.QFBnOcFiRLaHLiIK9kqgb61l-TVAUwwMsURTRgG113s"
// // //  //SymmetricSecurityKey

//  try{
//     var  payload=jwt.verify(token,"this_is_our_super_long_key_for_token_validation_project_2019_06_28$smesk.in")
//     console.log("data is"+Object.keys(payload)+"exp is"+payload.exp+"issue is"+payload.iss+
//     "aud"+payload.aud)
//   }
//   catch(e){

//       console.log("bad request"+e)

//   }

export const login = (username, password) => dispatch => {


  //alert("called success")
  var user = { 'Email': username, 'Password': password }

  const postRequest = fetch(ROOT_URL+'/api/Users/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    mode: 'cors',
    body: JSON.stringify(user)
  }).then((response) => {
    console.log("required" + response.status)
    //console.log('********'+response.statusText);
    response.json().then(data => {
      //alert(data.userId);
      console.log("data:......" + data.signInStatus)
      if (data.signInStatus === 'Authorized') {
        console.log('auth')
        // alert('id is' + data.userId);
        console.log(data.token)

        //  console.log("signing credentials "+Object.keys(data.claims))
        return dispatch({ type: SignIn_Action.AUTHORIZED, userId: data.userId });
      }
      else if (data.signInStatus === 'Not_Authorized') {
        console.log('not auth')
        return dispatch({ type: SignIn_Action.NOTAUTHORIZED })
      }

    })
  })
}