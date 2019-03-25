
import { View } from './view.js';

export class Myworkers extends View {

    constructor () {
        super();
        this.columns = [ 
            { "data":"Empleado"}, 
            { "data": "DNI" },
            { "data": "Puesto" },
            { "data": "Estado" },
            { "data": "Documentos" }, 
        ];
        this.datos = [
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
            
            ]
    }
    
    render () {
        return `
        <div class="content">
            <div><p><h2> MIS TRABAJADORES </h2></p></div>
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
                  <th>Empleado</th>
                  <th>DNI</th>
                  <th>Puesto</th>
                  <th>Estado</th>
                  <th>Documentos</th>
                </tr>
              </thead>
              <tfoot>
                <tr>

                <th>Empleado</th>
                  <th>DNI</th>
                  <th>Puesto</th>
                  <th>Estado</th>
                  <th>Documentos</th>

                </tr>
              </tfoot>
        </table>
        </div>
        `
    }
}