

export const database = {
        
    ref: new Firebase("https://myfirebase-magg.firebaseio.com/"),

    get usersRef () {
        return this.ref.child('documentManager');
    },
    get newUser () {
        return this.usersRef.child('users');
    },
    get userUid () {
        return this.newUser.child('lumiyiwUodWRJ9vNyVHvducKSJu2');
    },
    readDataSnapshot(section) { 
        
      return new Promise(function(resolve){
        let dbSection = database.userUid.child(section)
        dbSection.once("value", snapshot => {
            resolve(snapshot.val());  
        })  
      });
    },
    writeData(data,section,file){
        if(file){
            data.filePath = file.location.path_;
            data.Archivo = file.name ;
        }
        let newDocumentRef = this.userUid.child(section);
        newDocumentRef.push(data);
        window.toastr.success('Datos añadidos ');
    },
    updateData(key,data,section){
        
        let updates = {};
        updates[key] = data;
        let databaseRef = this.userUid.child(section);
        databaseRef.update(updates);
        window.toastr.success('Datos actualizados ');
    },
    deleteDocument(key){
        let docToRemove = this.userUid.documents.child(key);
        docToRemove.remove();
        window.toastr.success('Documento eliminado');
    },
    writeUserUrl(photoUrl){
        this.userUid.set({
            userPhotoUrl: photoUrl
        });


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


    
    loadFile(file,metadata,section){
        return new Promise(function(resolve){
            const firebaseStorage = firebase.storage();
            let storageRef = firebaseStorage.ref();
            let newFileCharged = storageRef.child(file.name);
            let newFileRef = storageRef.child('documents/' + file.name);

            if (metadata){
                database.writeData(metadata,section,newFileRef);
            }

            newFileRef.put(file)
            .then(()=>{
                toastr.success('Archivo guardado');
                resolve (newFileRef);
            })
          
        })
    },

    downloadFile(fileRef){
        return new Promise(function (resolve){
            const firebaseStorage = firebase.storage();
            let fileToDownload = fileRef;
            fileToDownload.getDownloadURL().then(function(downloadUrl){
            resolve (downloadUrl);
            })
        })
    },

    deleteFile(filePath){
        const firebaseStorage = firebase.storage();
        let fileToDelete = firebaseStorage.ref(filePath);
        fileToDelete.delete()
        .then((success)=>{
            window.toastr.success('Archivo eliminado');
            console.log(success);
        })
        .catch((error)=>{
            window.toastr.error(error.message);
            console.log(error)
            });
        
    }
}
