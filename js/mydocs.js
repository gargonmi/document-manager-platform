
import { View } from './view.js';
import { storage } from './storeManager.js';
import { Tabla } from './tables.js';
import { database } from './storeManager.js';

export class Mydocs extends View {

    constructor () {
        super();
        this.loading = false;
        this.columns = [ //Define Table Columns
            {title:"Documento", field:"Documento", width:150},
            {title:"Tipo de documento", field:"Tipo de documento", align:"left"},
            {title:"Asociado a ", field:"Asociado a"},
            {title:"Fecha del documento", field:"Fecha del documento", sorter:"date", align:"center"},
            {title:"Tiempo para que expire", field:"Tiempo para que expire", sorter:"date", align:"center"},
            {title:"Archivo", field:"Archivo", sorter:"date", align:"center"},
            {title:"Actualizar", align:"center", field:"filePath",
                formatter:function(){
                //cell - the cell component
                //formatterParams - parameters set for the column
                //onRendered - function to call when the formatter has been rendered
                return "<button>Actualizar</button>" ; //return the contents of the cell;
                },
                cellClick: function(e,cell){
                    storage.downloadFile(e,cell)
                }
            },
            {
                title:"Descargar", align:"center", field:"filePath",
                formatter: function(){
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    return "<button>Download</button>" ; //return the contents of the cell;
                },
                cellClick: function(e, cell){
                    storage.downloadFile(e,cell)
                }
            }
        ];
        
    }
    
    render () {
        return `
        <div class="content">
            <div><p><h2> MIS DOCUMENTOS</h2></p></div>
            <div><p>Documentos 
                 </p>
            </div>
            ${this.loading ? `<div class="spinner">loading...</div>` :
            `<div class="tabulatorTable"></div>`}
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

    afterMount () {
        this.drawTable();
    }

    addEventListeners () {
        this.query('#file').addEventListener('change', () => this.fileEventHandler(event));  
    }

    fileEventHandler(event){
        let file = event.target.files[0];
        let metadata = {
            'Documento': document.querySelector('.newDocumentName').value,
            'Tipo de documento': document.querySelector('.newDocumentType').value,
            'Asociado a': document.querySelector('.newDocumentLink').value,
            'Fecha del documento': document.querySelector('.newDocumentDate').value,
            'Tiempo para que expire': document.querySelector('.newDocumentExpire').value
        }
        storage.loadFile(file,metadata);
        this.drawTable();
    }

    drawTable(){
        this.loading = true;
        this.refreshView();
        database.readDataSnapshot().then(data => {
            this.loading = false;
            this.refreshView();
            let tableObj = new Tabla(this.columns);
            tableObj.formatTabulator(this.dataFormat(data));
        });
    }

    

    dataFormat(data){
        let filteredData=[];
        for (let property in data){
            filteredData.push(data[property])
        }
        
        return filteredData;
    }
}
