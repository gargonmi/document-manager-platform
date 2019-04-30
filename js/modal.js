import { View } from './view.js';
import { storage } from './storeManager.js';
import { database } from './storeManager.js';



export class Modal extends View {

    constructor (cell,modalType,workers) {
        super();
        this.modalType = modalType;
        this.cell = cell;
        this.section = 'docs';
        this.workers = workers;
        if(cell){
            this.doc = cell.getRow().getData();
        }
        this.onClose = new Promise((resolve) => {
            this.resolveOnClose = resolve;
        });
    }
    
    onClose () {
        return new Promise()
    }

    addEventListeners () {
        let operation;
        let fileLoader = this.query('#file')
        this.query('.closeModal').addEventListener('click', () => {
            this.removeNode();
            this.resolveOnClose(true);
            });
        switch(this.modalType){
            case 'docs':
                if (fileLoader != null){
                    fileLoader.addEventListener('change', () => this.fileEventHandler(event));
                }
                
                if(this.cell){
                    this.query('.updateFile').addEventListener('click', () => { 
                        operation = 'update'; 
                        this.modifyDataHandler(operation);
                        this.removeNode();
                    });
                    this.query('.deleteDocument').addEventListener('click', () => { 
                        operation = 'delete'; 
                        this.modifyDataHandler(operation);
                        this.removeNode();
                    });
                    this.query('.downloadFile').addEventListener('click', () => { 
                 
                        storage.downloadFile(this.cell.getValue()).then((fileUrl)=>window.open(fileUrl));
                        this.removeNode();
                    });
                }
                break;
            case 'workers':
            this.query('.makeWorker').addEventListener('click', () => { 
                 
                this.newWorkerHandler();
                this.removeNode();
            });
                break;
        }
        
    }

    fileEventHandler(event){
        
        let file = event.target.files[0];
        let metadataInputs = {
            'Documento': document.querySelector('.newDocumentName').value,
            'Tipo de documento': document.querySelector('.newDocumentType').value,
            'Asociado a': document.querySelector('.newDocumentLink').value,
            'Fecha del documento': document.querySelector('.newDocumentDate').value,
            'Tiempo para que expire': document.querySelector('.newDocumentExpire').value   
        }
        storage.loadFile(file,metadataInputs,this.section);
    }

    modifyDataHandler(operation){
        if(operation === 'update'){
            let metadata = {
                'Documento': document.querySelector('.newDocumentName').value,
                'Tipo de documento': document.querySelector('.newDocumentType').value,
                'Asociado a': document.querySelector('.newDocumentLink').value,
                'Fecha del documento': document.querySelector('.newDocumentDate').value,
                'Tiempo para que expire': document.querySelector('.newDocumentExpire').value   
            };
            metadata.filePath = this.cell.getValue();
            metadata.Archivo = this.doc.Archivo;
            this.workersOptions(this.workers);
            database.updateData(this.doc.key,metadata,'docs');
            this.resolveOnClose(true);
        }

        if(operation === 'delete'){
            if(confirm(`Seguro que quieres borrar de la base de datos: ${this.doc.Documento} ? 
                Esta operacion es irreversible...` )){
                database.deleteDocument(this.doc.key);
                storage.deleteFile(this.doc.filePath)
                this.resolveOnClose(true);
            }
        }

    }

    newWorkerHandler(){
        let workerData = {
            'worker': document.querySelector('.newWorkerName').value,
            'dni': document.querySelector('.newWorkerDNI').value,
            'position': document.querySelector('.newWorkerFunction').value,
            'level': document.querySelector('.newWorkerLevel').value,   
        };
        database.writeData(workerData,'workers');
        this.resolveOnClose(true);


    }

    workersOptions(workers){
        
        let workerOptions = workers.map(value =>{
             return '<option>' + value + '</option>' })
           
        return workerOptions.toString();
           
    }

    render () {
        switch (this.modalType) {
            case 'docs':
                return `
                <div class="app-modal-background"></div>
                <div class="app-modal-content">
                    
                        <div class="modalTitle">
                            <h3>${this.cell ? this.doc.Documento : ''}</h3>
                            <h4>${this.cell ? this.cell.getValue() : 'Cargar archivo'}</h4>
                        </div>
                        <div class="inputArea">
                            <input type="text" size=30 class="newDocumentName" placeholder="Nombre del documento" value="${this.cell ? this.doc.Documento : ''}" />
                            <input type="text" size=30 class="newDocumentType" placeholder="Tipo de documento" value="${this.cell ? this.doc['Tipo de documento'] : ''}"/>
                            <select class="newDocumentLink">
                                ${this.workersOptions(this.workers)}
                            </select>
                            <div class="dates">
                                <input type="date" size=10 class="newDocumentDate" placeholder="Fecha del documento" value="${this.cell ? this.doc['Fecha del documento'] : ''}"/>
                                <input type="date" size=10 class="newDocumentExpire" placeholder="Fecha de caducidad" value="${this.cell ? this.doc['Tiempo para que expire'] : ''}"/>
                            </div>
                        </div>
                        <div class="helperArea">
                            <input type="file" id="file" name="file"/>
                        </div>
                        ${this.cell ? ` 
                        <div class="buttonsArea">
                            <button class="updateFile">Actualizar</button>
                            <button class="downloadFile">Descargar</button>
                            <button class="deleteDocument">Eliminar</button> ` : ``} 
                            <button class="closeModal">Cerrar</button>
                        </div>
                </div>
            `;
                break;

            case 'workers':
                return `
                <div class="app-modal-background"></div>
                <div class="app-modal-content">
                    
                        <div class="modalTitle">
                            <h3>Añadir nuevo trabajador</h3>
                    
                        </div>
                        <div class="inputArea">
                            <input type="text" size=30 class="newWorkerName" placeholder="Nombre del trabajador"  />
                            <input type="text" size=30 class="newWorkerDNI" placeholder="DNI" />
                            <input type="text" size=30 class="newWorkerFunction" placeholder="Puesto que desempeña" />
                            <input type="text" size=5 class="newWorkerLevel" placeholder="Nivel"/>
                        </div>
                        <div class="buttonsArea">
                           
                            <button class="makeWorker">Crear</button> 
                            <button class="closeModal">Cerrar</button>
                        </div>
                        
                         
                </div>
                `;
                break;
        }
        
    }
        

}