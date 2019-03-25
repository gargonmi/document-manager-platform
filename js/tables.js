
export class Tabla {

    constructor(columns){
        this.columns = columns;
       
    }
    formatTable(datos){
    var tableDocs = $('#tabla'); 
    const tabla = tableDocs.dataTable({
       "dom": 'rtipl',
       "data": datos,
       "columns": this.columns });
    }
    
}


 
