import { View } from './view.js';
import { session } from './session-manager.js';
import { database } from './storeManager.js';
export class UserProfile extends View {

    constructor (user) {
        super();
        this.user = user;
        this.section = 'companys';
    }
    
    render () {
        return `
        <div class="profileArea">
            <div class="userConfig">
                <div><p><h2> DATOS DE USUARIO</h2></p></div>
                <p>Configura tu perfil de usuario</p>
                <img src="${this.user.photoURL ? this.user.photoURL : 'https://api.adorable.io/avatars/200/abott@adorable.png' }" height="200" width="200" ></img>
                <p><div id="userName">Name: ${this.user.displayName}  <button id="changeName">change</button></div></p>
                <p><div id="userPhoto">User photo: <input type="file" id="photoFile" name="file"/></div></p>
                <p><input class="userName" maxlength=30 placeholder="Introduce tu nombre de ususario"></p>
                <div id="userMail"> ${this.user.email}</div>
                <p><button id="save">save</button></p>
                <div data-link="logout">logout</div>

                <p><div id="changesOk">Updated</div></p>
            </div>

            <div class="company">
                <div><p><h2>EMPRESAS</h2></p></div>
                <p>Añade y edita tus empresas</p>
                <div class="inputsArea">
                    <input type="text" size=30 class="newCompanyName" placeholder="Nombre de la empresa"/>
                    <input type="text" size=20 class="newCompanyNif" placeholder="NIF"/>
                    <input type="text" size=40 class="newCompanyDirection" placeholder="Direccion"/>
                    <input type="text" size=20 class="newCompanyTel" placeholder="TEL"/>
                    <p><button class="saveCompany">Guardar</button></p>
                </div>
                <div class="companysArea">
            
                </div>
            </div>

            
        </div>
        `
    }
    addEventListeners () {
        this.query('#photoFile').addEventListener('change', () => session.updatePhotoUrl(event.target.files[0],this.user)); 
        this.query('.saveCompany').addEventListener('click', this.writeCompany);
    }

    afterMount(){
        //this.getCompanys(this.section);
    }

    writeCompany(){
        let companyData = {
            'companyName' : document.querySelector('.newCompanyName').value,
            'companyNif' : document.querySelector('.newCompanyNif').value,
            'companyDirection' : document.querySelector('.newCompanyDirection').value,
            'companyTel' : document.querySelector('.newCompanyTel').value,
        };
        console.log(companyData);
        database.writeData(companyData,this.section);

    }
    /*
    getCompanys(section){
        database.readDataSnapshot(section).then(companys => {
            this.query('.companysArea').innerText = companys;
            console.log(companys);
        });   
    }
    */
    
}