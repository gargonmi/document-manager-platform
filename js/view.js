export class View {
    constructor () {
        if (typeof this.render !== 'function') {
            throw new Error('Necesitas implementar un metodo render');
        }
    }

    mount (domNode) {
       const html = this.render();

       domNode.innerHTML = html;
    }

}