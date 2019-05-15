import { View } from './view.js';

export class Footer extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="footer">
        <p><h3>Contacto</h3></p>
         <p><h3>Ayuda</h3></p>
         <p><h3>Acerca de caeWizard</h3></p> 
        </div>
        `
    }
}