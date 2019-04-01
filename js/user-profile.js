import { View } from './view.js';

export class UserProfile extends View {

    constructor (user) {
        super();
        this.user = user;
    }
    
    render () {
        return `
        <div class="userConfig">
            <div><p><h2> USER CONFIG</h2></p></div>
            <p>Configura tu perfil de usuario</p>
            <img src='https://api.adorable.io/avatars/200/abott@adorable.png' height="200" width="200" ></img>
            <p><div id="userName">Name: ${this.user.displayName}  <button id="changeName">change</button></div></p>
            <p><div id="userPhoto">User photo: ${this.user.photoURL} <button id="changePhoto">change</button></div></p>
            <p><input class="userName" maxlength=30 placeholder="Introduce tu nombre de ususario"></p>
            <div id="userMail">Mail: ${this.user.email}</div>
            <p><button id="save">save</button></p>
            <div data-link="logout">logout</div>

            <p><div id="changesOk">Updated</div></p>
        </div>
        `
    }
   
    updateProfile(){

     
    this.user.updateProfile(
        {
           displayName:"Miguel Angel Garcia",
           photoURL:"Miguel Angel Garcia"
        });
    
    }
}