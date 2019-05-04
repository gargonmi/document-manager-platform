
import { Header } from './header.js';
import { Home } from './home.js';
import { Footer } from './footer.js';
import { Nav } from './nav.js';
import { ViewManager } from './view-manager.js'
import { Mydocs } from './mydocs.js';
import { Myworkers } from './myworkers.js';
import { Mysites } from './mysites.js';
import { Profiles } from './profile.js';

import { database, storage} from './storeManager.js';
import { inicializefirebase } from './storeManager.js';
import { session } from './session-manager.js';
import { UserLogin } from './session-manager.js';
import { UserProfile } from './user-profile.js';
import { Modal } from './modal.js';



let wrapper = document.querySelector('.wrapper');

let viewManager = new ViewManager({
    nav: '.app-nav',
    content: '.app-content',
    footer: '.app-footer',
    head: '.app-header',
    login:'.app-login',
    modal:'.app-modal'
})

window.app = {
    viewManager
}


inicializefirebase();

//INIT 
function init(){
    
    //session.logout();
    let userLogin = new UserLogin();
    viewManager.showView(userLogin, 'login');
    document.querySelector('#submitLogin').addEventListener('click',loginHandler);
    login()
   
}

// LOGIN EVENT
function loginHandler(event){
    
    if (event.target.id === "submitLogin"){
       let mail = document.querySelector('.inputMail').value;
       let pass = document.querySelector('.inputPass').value;
       login(mail,pass);
    }
}

//LOGIN

function login(email,pass){
    
    //session.loginFire(email,pass);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            if (document.body.contains(document.querySelector('.app-login'))){
                wrapper.removeChild(document.querySelector('.app-login'));}
               
            enter(user);
        }

        
    });
        
    
}

function actualHash () {
    return window.location.hash.substr(1);
}

// TO ENTER 

function route (path, firstNavigation,user) {
    let viewToShow

    switch (path) {

        case 'dashboard':
            let home1 = new Home();
            viewToShow = home1;
            break;
        case 'perfil':
            viewToShow = profiles;
            break;
        case 'documentos':
            let mydocs = new Mydocs();
            viewToShow = mydocs;
            break;
        case 'trabajadores':
            let myworkers = new Myworkers();
            viewToShow = myworkers;
            break;
        case 'plataformas':
            let mysites = new Mysites();
            viewToShow = mysites;
            break;
        case 'configuracion':
            
            let userProfile = new UserProfile(user)
            viewToShow = userProfile;
            break;
        case 'logout': 
            location.reload(true);
            break;
        }

        if (viewToShow) {
            viewManager.showView(viewToShow, 'content');
        } else if (firstNavigation) {
            let home1 = new Home;
            viewManager.showView(home1, 'content');
        }
}


function enter(user){
    
    window.addEventListener('hashchange', function() {
        route(actualHash(), false, user)
    }, false);

    route(actualHash(), true,user);

    //SHOW DEFAULT VIEWS
    let nav = new Nav(user);
    let footer1 = new Footer();
    let head = new Header();
    let home1 = new Home();

    viewManager.showView(nav, 'nav');
    viewManager.showView(head,'head');
    viewManager.showView(footer1,'footer');

    //SHOW USER INFO
    let userMailNode = document.querySelector('#userMail');
    //userMailNode.innerHTML = user.email;
}


window.onload = init();


 










 














