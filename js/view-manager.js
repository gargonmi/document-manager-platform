export class ViewManager {

    constructor (layoutConfig) {
        if (typeof layoutConfig !== 'object') {
            throw new Error('Es necesario configurar un layout para el ViewManager');
        }
    
        this.layoutConfig = layoutConfig;
        this.sections = this._createSections(layoutConfig);
    }

    _createSections (layoutConfig) {
        const sections = {};

        for (let [key, value] of layoutConfig) {
            if (typeof value !== 'string') {
                throw new Error('Formato de seccion no valido. Tiene que ser en formato string');
            }

            const node = document.querySelector(value);
            
            if (!node) {
                throw new Error(`No existe la seccion ${key} en el DOM`);
            }

            sections[key] = node;
        }

        return sections;
    }

    showView (view, sectionName) {
        if (!view instanceof View) {
            throw new Error('La vista no es una instancia de View');
        }    
}




}