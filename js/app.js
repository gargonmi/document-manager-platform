
import { Header } from './header.js';
import { Home } from './home.js';
import { Footer } from './footer.js';
import { Nav } from './nav.js';
import { ViewManager } from './view-manager.js'
import { Mydocs } from './mydocs.js';
import { Myworkers } from './myworkers.js';
import { Mysites } from './mysites.js';
import { Profiles } from './profile.js';
import { Tabla } from './tables.js';
import { database, storage} from './storeManager.js';
import { inicializefirebase } from './storeManager.js';
import { session } from './session-manager.js';
import { UserLogin } from './session-manager.js';
import { UserProfile } from './user-profile.js';


let wrapper = document.querySelector('.wrapper');
let home1 = new Home();
let nav = new Nav();
let footer1 = new Footer();
let head = new Header();
let mydocs = new Mydocs();
let myworkers = new Myworkers();
let mysites = new Mysites();
let profiles = new Profiles();

let viewManager = new ViewManager({
    nav: '.app-nav',
    content: '.app-content',
    footer: '.app-footer',
    head: '.app-header',
    login:'.app-login'
    })

inicializefirebase();

//INIT 
function init(){
    
    //session.logout();
    let userLogin = new UserLogin();
    viewManager.showView(userLogin, 'login');
    viewManager.sections.login.addEventListener('click',loginHandler);
   
    login();
   
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

function route (path, firstNavigation) {
    let viewToShow

    switch (path) {

        case 'dashboard':
            viewToShow = home1;
            break;
        case 'perfil':
            viewToShow = profiles;
            break;
        case 'documentos':
            viewToShow = mydocs;
            break;
        case 'trabajadores':
            viewToShow = myworkers;
            break;
        case 'plataformas':
            viewToShow = mysites;
            break;
        case 'configuracion':
            let userConfig = new UserProfile(user)
            viewManager.showView(userConfig, 'content');
            break;
        case 'logout': 
            location.reload(true);
            break;
        }

        if (viewToShow) {
            viewManager.showView(viewToShow, 'content');
        } else if (firstNavigation) {
            viewManager.showView(home1, 'content');
        }
}


function enter(user){
    
    window.addEventListener('hashchange', function() {
        route(actualHash(), false)
    }, false);

    route(actualHash(), true);

    //SHOW VIEWS
    viewManager.showView(nav, 'nav');
    viewManager.showView(head,'head');
    viewManager.showView(footer1,'footer');

    //SHOW USER INFO
    let userMailNode = document.querySelector('#userMail');
    userMailNode.innerHTML = user.email;

    // files handler event 
    function fileEventHandler(event){
        let file = event.target.files[0]; 
       
        storage(file);
    }
    document.querySelector('#file').addEventListener('change',fileEventHandler);
}


window.onload = init();


 










 














