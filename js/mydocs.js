
import { View } from './view.js';
import { storage } from './storeManager.js';
import { Tabla } from './tables.js';
import { database } from './storeManager.js';
import { Modal } from './modal.js';
import { ViewManager } from './view-manager.js';

export class Mydocs extends View {
    constructor () {
        super();
        this.loading = false;
        const that = this;
        this.section = 'documents';
        this.columns = [ //Define Table Columns
            {title:"Documento", field:"Documento", width:150},
            {title:"Tipo de documento", field:"Tipo de documento", align:"left"},
            {title:"Asociado a ", field:"Asociado a"},
            {title:"Fecha del documento", field:"Fecha del documento", sorter:"date", align:"center"},
            {title:"Tiempo para que expire", field:"Tiempo para que expire", sorter:"date", align:"center"},
            {title:"Archivo", field:"Archivo", sorter:"date", align:"center"},
            {
                title:"Gestionar", align:"center", field:"filePath",
                formatter: function(){
                    //cell - the cell component
                    //formatterParams - parameters set for the column
                    //onRendered - function to call when the formatter has been rendered
                    return "<button>Gestionar</button>" ; //return the contents of the cell;
                },
                cellClick: function(e, cell){

                    that.showCloseModal(e,cell);
                    console.log(cell.getRow().getData());
                    
                }
            }
        ];
        
    }
    
    render () {
        return `
        <div class="content">
            <div class="sectionTitle"><h2> MIS DOCUMENTOS</h2></div>
            ${this.loading ? `<div class="spinner">
            <img src="./assets/img/spinner.gif"></div>` :
            `<div class="tabulatorTable"></div>`}
            <button class="loadFile">Cargar nuevo archivo</button>
           
            
        </div>  
        `
    }
    
    afterMount () {
        this.drawTable();
    }

    addEventListeners () {
        this.query('.loadFile').addEventListener('click', () => this.showCloseModal()); 
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
        storage.loadFile(file,metadata).then(()=>this.drawTable());
        
    }

    drawTable(){
        this.loading = true;
        this.refreshView();
        // window.app.viewManager.showView(new CreateDocModal(), 'app-modal')
        database.readDataSnapshot(this.section).then(data => {
            this.loading = false;
            this.refreshView();
            let tableObj = new Tabla(this.columns);
            tableObj.formatTabulator(this.dataFormat(data));
        });
        this.remove;
    }

    

    dataFormat(data){
        let filteredData=[];
        
        for (let property in data){
            if(property!='userPhotoUrl'){
                data[property].key = property;
                filteredData.push(data[property])
            }
        }
        return filteredData;
    }

    showCloseModal(event,cell){
        let modal = new Modal(event,cell);
        window.app.viewManager.showView(modal,'modal');
        modal.onClose.then((success) => {
            if (success) {
                this.drawTable();
            }
        });
    }
}

    // static function



let changes = database.userUid.on("value", snapshot => {
    window.toastr.success('La base de datos ha cambiado');
   // Mydocs.refreshView();
    });
