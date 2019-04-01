import { View } from './view.js';


export class Nav extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="nav">
            
            <p><div data-link="dashboard">dashboard</div></p>
            <p><div data-link="profile">perfil</div></p>
            <p><div data-link="myDocs">mis documentos</div></p>
            <p><div data-link="myWorkers">trabajadores</div></p>
            <p><div data-link="mySites">mis centros</div></p>

              
        </div>

        <div class="user">
            <img src='https://api.adorable.io/avatars/100/abott@adorable.png'></img>
            <div id="userMail"></div>
            <p><div data-link="userConfig">configurar</div></p>
             <div data-link="logout">logout</div>
        </div>
        `
    }
}