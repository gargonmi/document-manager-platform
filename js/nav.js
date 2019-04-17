import { View } from './view.js';


export class Nav extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="nav">
            
            <p><a href="#dashboard">dashboard</a></p>
            <p><a href="#perfil">perfil</a></p>
            <p><a href="#documentos">mis documentos</a></p>
            <p><a href="#trabajadores">trabajadores</a></p>
            <p><a href="#plataformas">mis centros</a></p>

              
        </div>

        <div class="user">
            <img src='https://api.adorable.io/avatars/100/abott@adorable.png'></img>
            <div id="userMail"></div>
            <p><a href="#configuracion">configurar</a></p>
             <a href="#logout">logout</a>
        </div>
        `
    }
}