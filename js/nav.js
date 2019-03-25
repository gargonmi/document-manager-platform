import { View } from './view.js';

export class Nav extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="nav">
            
            <div data-link="dashboard">dashboard</div>
            <div data-link="profile">perfil</div>
            <div data-link="myDocs">mis documentos</div>
            <div data-link="myWorkers">mis trabajadores</div>
            <div data-link="mySites">mis centros</div>

              
        </div>

        <div class="user">
            <div data-link="logout">logout</div>
        </div>
        `
    }
}