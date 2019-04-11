
import { View } from './view.js';

export class Home extends View {

    constructor (miVar) {
        super();
       
    }
    
    render () {
        return `
        <div class="content">
            <div><p><h2> DASHBOARD </h2></p></div>
            <div><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Nostrum autem nam necessitatibus dicta, dolor iure tempora, 
                    quaerat rem sint optio ipsum voluptatibus, perspiciatis temporibus
                     quae commodi! Voluptatibus rerum cupiditate inventore, saepe 
                     nam adipisci consequatur. Amet nulla unde totam. Quibusdam nihil 
                     dignissimos dolorem sunt vel, molestiae molestias nostrum. Maiores,
                     ut blanditiis.
                 </p>
            </div>
            <div>
                <input type="file" id="file" name="file"/> 
            </div>
        </div>
        `
    }
}