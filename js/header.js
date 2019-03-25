


import { View } from './view.js';

export class Header extends View {

    constructor () {
        super();
    }
    
    render () {
        return `
        <div class="header">
        <h1>security manager</h1>
        </div>
        `
    }
}