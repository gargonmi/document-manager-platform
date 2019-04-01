
export let database;
export let inicializefirebase;
//import {user} from session-manager.js;

const ref = new Firebase("https://myfirebase-magg.firebaseio.com/peliculas");
/*
const docsBase = ref.child("documentos");
const workersBase = ref.child("workers");

docsBase.set([
  {
      "Documento":"Certificado hacienda",
      "Tipo de documento":"Impuestos",
      "Asociado a":"Tubecleaners",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"25 dias"
  },
  {
      "Documento":"Certificado Seguridad social",
      "Tipo de documento":"Impuestos",
      "Asociado a":"Tubecleaners",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"13 dias"
  },
  {
      "Documento":"EPIS",
      "Tipo de documento":"prl",
      "Asociado a":"Pedro Jimenez currela",
      "Fecha del documento":"12 septiembre",
      "Tiempo para que expire":"1 dias"
  },
  {
      "Documento":"Curso de alturas",
      "Tipo de documento":"curso",
      "Asociado a":" Pepito currante",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"25 dias"
  },
  {
      "Documento":"plan de prevencion",
      "Tipo de documento":"prl",
      "Asociado a":"Tubecleaners",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"25 dias"
  },
  {
      "Documento":"Seguro accidentes",
      "Tipo de documento":"Seguros",
      "Asociado a":"Tubecleaners",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"25 dias"
  },
  {
      "Documento":"Seguro rc",
      "Tipo de documento":"Seguros",
      "Asociado a":"Tubecleaners",
      "Fecha del documento":"25 septiembre",
      "Tiempo para que expire":"25 dias"
  }
  ]
);
workersBase.set([
  {
      "Empleado":"Federico Jimenez",
      "DNI":"2550039P",
      "Puesto":"Supervisor",
      "Estado":"Verde",
      "Documentos":"Link"
  },
  {
      "Empleado":"Paco Porras",
      "DNI":"43240044P",
      "Puesto":"Tecnico",
      "Estado":"Rojo",
      "Documentos":"Link"
  },
  {
      "Empleado":"federico sanchez",
      "DNI":"43240044P",
      "Puesto":"Tecnico",
      "Estado":"Rojo",
      "Documentos":"Link"
  },
  {
      "Empleado":"Fulanito gonzalez",
      "DNI":"43240044P",
      "Puesto":"Tecnico",
      "Estado":"Rojo",
      "Documentos":"Link"
  },
  {
      "Empleado":"fermin Garcia",
      "DNI":"4325674P",
      "Puesto":"Administrativo",
      "Estado":"Rojo",
      "Documentos":"Link"
  },
  {
      "Empleado":"Paco Porras",
      "DNI":"423876P",
      "Puesto":"Jefe equipo",
      "Estado":"Rojo",
      "Documentos":"Link"
  },
  {
      "Empleado":"Paco Porras",
      "DNI":"4376765",
      "Puesto":"Limpiador",
      "Estado":"Rojo",
      "Documentos":"Link"
  }
  ]);
 */

  database = {
    readData(base) { 
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
