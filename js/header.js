


import { View } from './view.js';

export class Header extends View {

    constructor () {
        super();
        this.miVar = ''
    }
    
    render () {
        return `
        <div class="header">
        <h1>CAE-manager</h1>
        </div>
        `
    }
}