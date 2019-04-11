
import { View } from './view.js';
import {storage} from './storeManager.js';
import { Tabla } from './tables.js';
import { database } from './storeManager.js';

export class Mydocs extends View {

    constructor () {
        super();
        this.userName = 'Sin nombre';
        this.columns =  [
            { "data":"Documento"}, 
            { "data": "Tipo de documento" },
            { "data": "Asociado a" },
            { "data": "Fecha del documento" },
            { "data": "Tiempo para que expire" }, 
            { "data": "Nombre del archivo" }, 
            { "data": "Formato" },
            { "data": "Extension" },  
        ]
        this.datos = [
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

    }
    
    render () {
        return `
        <div class="content">
            <div><p><h2> MIS DOCUMENTOS ${this.userName} </h2></p></div>
            <div><p>Documentos 
                 </p>
            </div>
            <table id="tabla" class="tableGeneric" style="width:100%">
            <thead>
                <tr>
                  <th>Documento</th>
                  <th>Tipo de documento</th>
                  <th>Asociado a</th>
                  <th>Fecha del documento</th>
                  <th>Tiempo para que expire</th>
                  <th>Nombre del archivo</th>
                  <th>Formato</th>
                  <th>Extension</th>
                </tr>
              </thead>
              <tfoot>
                <tr>

                <th>Documento</th>
                <th>Tipo de documento</th>
                <th>Asociado a</th>
                <th>Fecha del documento</th>
                <th>Tiempo para que expire</th>
                <th>Nombre del archivo</th>
                <th>Formato</th>
                <th>Extension</th>

                </tr>
              </tfoot>
        </table>
            <div class="uploadFileArea">
                <input type="text" class="newDocumentName" placeholder="Nombre del documento"/>
                <input type="text" class="newDocumentType" placeholder="Tipo de documento"/>
                <input type="text" class="newDocumentLink" placeholder="Asociado a"/>
                <input type="text" class="newDocumentDate" placeholder="Fecha del documento"/>
                <input type="text" class="newDocumentExpire" placeholder="Fecha de caducidad"/>
                <input type="file" id="file" name="file"/> 
            </div>
        </div>
        `
    }

    addEventListeners () {
        this.query('#file').addEventListener('change', () => this.fileEventHandler(event));
    }


    fileEventHandler(event){
        let file = event.target.files[0];
        let metadata = {
            'documentName': document.querySelector('.newDocumentName').value,
            'documentType': document.querySelector('.newDocumentType').value,
            'documentLink': document.querySelector('.newDocumentLink').value,
            'documentDate': document.querySelector('.newDocumentDate').value,
            'documentdate': document.querySelector('.newDocumentExpire').value
        }
        storage(file,metadata);
        this.refreshView();
    }

    drawTable(){
        let tableObj = new Tabla(this.columns);
        database.readData(data).then((info)=>{tableObj.formatTable(info)});
    }
}
