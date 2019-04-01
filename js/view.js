export class View {
    constructor () {
        if (typeof this.render !== 'function') {
            throw new Error('Necesitas implementar un metodo render');
        }
    }

    mount (domNode) {
       const html = this.render();
       
       this._domNode = domNode;

       domNode.innerHTML = html;
    }

    refreshView () {
        const html = this.render();

        this._domNode.innerHTML = html;
    }

}