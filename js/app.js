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
    console.log('en init');
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
            console.log(uid);
            if (document.body.contains(document.querySelector('.app-login'))){
                wrapper.removeChild(document.querySelector('.app-login'));}
            enter(user);
            
        }
    });
        

}

// TO ENTER 

function enter(user){    

    console.log('en enter');

    //SHOW VIEWS
    viewManager.showView(nav, 'nav');
    viewManager.showView(head,'head');
    viewManager.showView(footer1,'footer');
    viewManager.showView(home1,'content');

    //SHOW USER INFO
    let userMailNode = document.querySelector('#userMail');
    userMailNode.innerHTML = user.email;

    //user.displayName = 'Miguel';
    //user.updateProfile(
       // {
           // displayName:"Miguel Angel Garcia"
        //}
    //).then(()=>console.log('update OK'));
    // let rootRef = storage.ref();


    // EVENTS

    viewManager.sections.nav.addEventListener('click',navHandler);
    function navHandler(event){

        if (event.target.dataset.link ===  'logout'){
            location.reload(true);}

        else if (event.target.dataset.link ===  'userConfig'){
            console.log("userconfig");
            let userConfig = new UserProfile(user)
            viewManager.showView(userConfig, 'content');
        }
        else {
            console.log(event.target.dataset.link);
            console.log('por else');
            let viewToShow;
            let data;
    
            switch (event.target.dataset.link) {

            case 'dashboard':
                viewToShow = home1;
                break;

            case 'profile':
                viewToShow = profiles;
                head.miVar = 'hola'
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
        //let tableObj = new Tabla(viewToShow.columns);
        //database.readData(data).then((info)=>{tableObj.formatTable(info)});
        }
    }
    // files handler event 
    function fileEventHandler(event){
        let file = event.target.files[0]; 
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
        console.log(file);
        console.log(event);
        storage(file);
    }
    document.querySelector('#file').addEventListener('change',fileEventHandler);
}


window.onload = init();


 










 














