
export let session;
import { View } from './view.js';

export class UserLogin extends View {

    constructor () {
        super();
        
    }
    
    render () {
        return `
        
            <div class="login">
                <div><p><h2> SECURITY MANAGER </h2></p>
                </div>
                <div>
                    <p>Inicie sesion para entrar</p>
                </div>
                <div>
                    <p><input class="inputMail" placeholder="mail"></p>
                    <p><input class="inputPass" placeholder="password"></p>
                    <button id="submitLogin">login</button>
                </div>
            </div>    
            <p><div class="errors"></div></p>
        
        `
    }
}

session = {

    loginFire(email,pass){
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message; 
            let divErrors = document.querySelector('.errors');
            divErrors.innerHTML = (errorCode + ": " + errorMessage);
         });
    },
    logout(){
        firebase.auth().signOut();
    },

}