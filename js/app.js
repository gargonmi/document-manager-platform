import { Header } from './header.js';
import { Home } from './home.js';
import { Footer } from './footer.js';
import { Nav } from './nav.js';
import { ViewManager } from './view-manager.js';
import { Mydocs } from './mydocs.js';
import { Myworkers } from './myworkers.js';
import { Mysites } from './mysites.js';
import { Profiles } from './profile.js';
import { Tabla } from './tables.js';
import { database} from './storeManager.js';
import { inicializefirebase } from './storeManager.js';
import { loginFire } from './storeManager.js';
import { UserLogin } from './login.js';


let wrapper = document.querySelector('.wrapper');
let home1 = new Home();
let nav = new Nav();
let footer1 = new Footer();
let head = new Header();
let mydocs = new Mydocs();
let myworkers = new Myworkers();
let mysites = new Mysites();
let profiles = new Profiles();

inicializefirebase();


    

//INIT 
function init(){
    
    firebase.auth().signOut();
    let loginDiv = document.createElement('div');
    loginDiv.setAttribute('class','app-login');
    wrapper.appendChild(loginDiv);
    let userLogin = new UserLogin();
    let viewManager = new ViewManager({
        nav: '.app-nav',
        content: '.app-content',
        footer: '.app-footer',
        head: '.app-header',
        login:'.app-login'
        })
    viewManager.showView(userLogin, 'login');
    viewManager.sections.login.addEventListener('click',loginHandler);
    console.log('en init');
    
}







function loginHandler(event){
    
    if (event.target.id === "submitLogin"){
       let mail = document.querySelector('.inputMail').value;
       let pass = document.querySelector('.inputPass').value;
       login(mail,pass);
    }
}


function login(email,pass){
    
    
    loginFire(email,pass);
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
     console.log('el usuario existe');
     if (document.body.contains(document.querySelector('.app-login'))){
        wrapper.removeChild(document.querySelector('.app-login'));}
        enter();
    }   
    });
    
  
}

function enter(){
    let viewManager = new ViewManager({
        nav: '.app-nav',
        content: '.app-content',
        footer: '.app-footer',
        head: '.app-header',
        
        })
    
    
    viewManager.showView(nav, 'nav');
    viewManager.showView(head,'head');
    viewManager.showView(footer1,'footer');
    viewManager.showView(home1,'content');

    // EVENTS

viewManager.sections.nav.addEventListener('click',navHandler);
function navHandler(event){

    if (event.target.dataset.link ===  'logout'){
        location.reload(true);}
    else{
        let viewToShow;
        let data;
    
        switch (event.target.dataset.link) {

            case 'dashboard':
                viewToShow = home1;
                break;

            case 'profile':
                viewToShow = profiles;
                break;
            case 'myDocs':
                viewToShow = mydocs;
                data = "documentos";
                break;
            case 'myWorkers':
                viewToShow = myworkers;
                data = "workers";
                break;

            case 'mySites':
                viewToShow = mysites;
                break;
        
        }
        viewManager.showView(viewToShow,'content');
        let tableObj = new Tabla(viewToShow.columns);
        database.readData(data).then((info)=>{tableObj.formatTable(info)});
    }

}

}


window.onload = init();









 














