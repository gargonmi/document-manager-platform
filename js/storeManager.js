
export const database = {

    readDataSnapshot() { 
        let ref = new Firebase("https://myfirebase-magg.firebaseio.com/");
        let usersRef = ref.child('documentManager');
        let newUser = usersRef.child('users');
        let userUid = newUser.child("lumiyiwUodWRJ9vNyVHvducKSJu2");
      return new Promise(function(resolve){
        userUid.once("value", snapshot => {
            resolve(snapshot.val());  
        })  
      });
    },
    writeData(metadata,file){
        let ref = new Firebase("https://myfirebase-magg.firebaseio.com/");
        let usersRef = ref.child('documentManager');
        let newUser = usersRef.child('users');
        let userUid = newUser.child("lumiyiwUodWRJ9vNyVHvducKSJu2");
        metadata.filePath = file.location.path_;
        metadata.Archivo = file.name ;
        let newDocument = userUid.push(metadata);
        window.toastr.success('Document data saved ');
    },

    listenerData(){
        let ref = new Firebase("https://myfirebase-magg.firebaseio.com/");
        let usersRef = ref.child('documentManager');
        let newUser = usersRef.child('users');
        let userUid = newUser.child("lumiyiwUodWRJ9vNyVHvducKSJu2");
        return new Promise (function (resolve) { 
            userUid.once("value", snapshot => {
            console.log("datos actualizados"); 
            });
        })
    }
  
}

export function inicializefirebase () {
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
  
  window.firebase.initializeApp(config);
}


export const storage = { 
    
    loadFile(file,metadata){

        const firebaseStorage = firebase.storage();
        let storageRef = firebaseStorage.ref();

        // Create a reference to new file charged
        let newFileCharged = storageRef.child(file.name);

        // Create a path reference to 'images/mountains.jpg'
        let newFileChargedPath = storageRef.child('documents/' + file.name);

        newFileChargedPath.put(file);
        toastr.success('File Stored');
        //let filePath = newFileChargedPath.location.path_;
        database.writeData(metadata,newFileChargedPath);
    },

    downloadFile(e,cell){
        
        const firebaseStorage = firebase.storage();
        let pathReference = firebaseStorage.ref(cell.getValue());

        pathReference.getDownloadURL().then(function(url){
            window.open(url);
        })
    }
}
