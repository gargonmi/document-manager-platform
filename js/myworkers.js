
import { View } from './view.js';
import { storage } from './storeManager.js';
import { Tabla } from './tables.js';
import { database } from './storeManager.js';
import { Modal } from './modal.js';
import { ViewManager } from './view-manager.js';

export class Myworkers extends View {
    constructor () {
        super();
        this.loading = false;
        const that = this;
        this.section = 'workers';
        this.columns = [ 
            {title:"Empleado", field:"worker", width:150},
            {title:"Dni", field:"dni", align:"left"},
            {title:"Puesto", field:"position"},
            {title:"Estado", field:"state", align:"center"},
            {title:"Nivel", field:"level", align:"center"},
            
            {
                title:"Documentos", align:"center", field:"filePath",
                formatter: function(){
                    
                    return "<button>Acceder</button>" ; 
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
            <div class="sectionTitle"><h2> TRABAJADORES</h2></div>
            ${this.loading ? `<div class="spinner">
            <img src="./assets/img/spinner.gif"></div>` :
            `<div class="tabulatorTable"></div>`}
            <button class="newWorker">Nuevo trabajador</button>
           
            
        </div>  
        `
    }
    
    afterMount () {
        this.drawTable();
    }

    addEventListeners () {
        this.query('.newWorker').addEventListener('click', () => this.showCloseModal()); 
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
        console.log(filteredData);
        return filteredData;
    }

    showCloseModal(event,cell){
        
        let modal = new Modal(event,cell,'workers');
        window.app.viewManager.showView(modal,'modal');
        modal.onClose.then((success) => {
            if (success) {
                this.drawTable();
            }
        });
    }
}

    



let changes = database.userUid.on("value", snapshot => {
    window.toastr.success('La base de datos ha cambiado');
   // Mydocs.refreshView();
    });
