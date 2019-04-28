import { View } from './view.js';


export class Nav extends View {

    constructor (user) {
        super();
        this.user = user;
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
            <img src='${this.user.photoURL ? this.user.photoURL : 'https://api.adorable.io/avatars/200/abott@adorable.png' }' height="100" width="100"></img>
            ${this.user.displayName}
            ${this.user.email}
            <p><a href="#configuracion">configurar</a></p>
             <a href="#logout">logout</a>
        </div>
        `
    }
}