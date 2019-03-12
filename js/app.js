import { Home } from './home.js';
import { ViewManager } from './view-manager.js';

let home1 = new Home();
let home2 = new Home();

let viewManager = new ViewManager({
    nav: '.app-nav',
    content: '.app-content',
    footer: '.app-footer'
})

viewManager.showView(home1, 'nav');
viewManager.showView(home2, 'content');







