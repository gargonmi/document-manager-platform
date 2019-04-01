
import { View } from './view.js';

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
            <div><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Nostrum autem nam necessitatibus dicta, dolor iure tempora, 
                    quaerat rem sint optio ipsum voluptatibus, perspiciatis temporibus
                     quae commodi! Voluptatibus rerum cupiditate inventore, saepe 
                     nam adipisci consequatur. Amet nulla unde totam. Quibusdam nihil 
                     dignissimos dolorem sunt vel, molestiae molestias nostrum. Maiores,
                     ut blanditiis.
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
                </tr>
              </thead>
              <tfoot>
                <tr>

                <th>Documento</th>
                <th>Tipo de documento</th>
                <th>Asociado a</th>
                <th>Fecha del documento</th>
                <th>Tiempo para que expire</th>

                </tr>
              </tfoot>
        </table>
        <button id="mydocs-button">Cambiar nombre</button>
        </div>
        `
    }

    addEventListeners () {
        this.query('#mydocs-button').addEventListener('click', () => this.changeName());
    }

    changeName () {
        this.userName = 'Miguel';
        this.refreshView();
    }
}
