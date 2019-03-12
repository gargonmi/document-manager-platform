

//import 'bootstrap';
import { View } from './view.js';
import { Home } from './home.js';

let home = new Home();

const domNode = document.querySelector('.section-container');

home.mount(domNode);



// spa.addView(view, '.section-container')

