
export class Tabla {

    constructor(columns){
        this.columns = columns;    
    }

    
    formatTabulator(data){
        var table = new Tabulator(".tabulatorTable", {
            
            height:false, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
            data:data, //assign data to table
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:this.columns
            
        });
    };
}


 
