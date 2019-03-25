import { View } from './view.js';

export class Footer extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="footer">
        <p><h3>Contacto   Ayuda   Sobre security manager</h3></p>
        </div>
        `
    }
}