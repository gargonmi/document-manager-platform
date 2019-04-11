
export let database;
export let inicializefirebase;
export let storage;

//import {user} from session-manager.js;
//apellido.push({apellidodeMiguel:"garcia"});
//usersRef.set({otrousuario:"pepe"});


  database =  {


    readData(base) { 

   
/*
      return new Promise(function(resolve){
        ref.once("value", snapshot => {
          let data;
          switch (base){

            case "documentos":
            data = snapshot.val().documentos;
            resolve(data);
            break;

            case "workers":
            data = snapshot.val().workers;
            resolve(data);
            break;
          }
        })  
      });
      */
    },
    writeData(metadata,filePath){
        let ref = new Firebase("https://myfirebase-magg.firebaseio.com/");
        let usersRef = ref.child('documentManager');
        let newUser = usersRef.child('users');
        let userUid = newUser.child("lumiyiwUodWRJ9vNyVHvducKSJu2");
        metadata.filePath = filePath;
        let newDocument = userUid.push(metadata);



    }
  }
inicializefirebase = function(){
 // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "AIzaSyAw_zg3_NZO4VEXDZYMLypf9PM3I3RSVXo",
    authDomain: "myfirebase-magg.firebaseapp.com",
    databaseURL: "https://myfirebase-magg.firebaseio.com",
    projectId: "myfirebase-magg",
    storageBucket: "myfirebase-magg.appspot.com",
    messagingSenderId: "432197009292"
  };
  firebase.initializeApp(config);
  
}


storage = function(file,metadata){

    storage = firebase.storage();
    let storageRef = storage.ref();


    // Create a reference to new file charged
    let newFileCharged = storageRef.child(file.name);

    // Create a path reference to 'images/mountains.jpg'
    let newFileChargedPath = storageRef.child('documents/' + file.name);

    // While the file names are the same, the references point to different files
    //mountainsRef.name === mountainImagesRef.name            // true
    //mountainsRef.fullPath === mountainImagesRef.fullPath    // false

    newFileChargedPath.put(file);
    database.writeData(metadata,newFileChargedPath.location.path_);
    

}