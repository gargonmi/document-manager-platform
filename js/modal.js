import { View } from './view.js';
import { storage } from './storeManager.js';
import { database } from './storeManager.js';

export class Modal extends View {

    constructor (e,cell) {
        super();
        this.e = e;
        this.cell = cell;
        this.section = 'documents';
        if(cell){
            this.doc = cell.getRow().getData();
        }
        this.onClose = new Promise((resolve) => {
            this.resolveOnClose = resolve;
        });
    }
    
    render () {
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
                        <input type="text" size=20 class="newDocumentLink" placeholder="Asociado a" value="${this.cell ? this.doc['Asociado a'] : ''}"/>
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
        `
    }

    onClose () {
        return new Promise()
    }

    addEventListeners () {
        let operation;
        let fileLoader = this.query('#file')
        if (fileLoader != null){
            fileLoader.addEventListener('change', () => this.fileEventHandler(event));
        }
        this.query('.closeModal').addEventListener('click', () => {
            this.removeNode();
            this.resolveOnClose(true);
        });
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
        
    }

    fileEventHandler(event){
        console.log('fileHandler');
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
            database.updateData(this.doc.key,metadata);
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
        

}