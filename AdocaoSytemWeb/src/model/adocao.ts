import { pets } from './pets';
import { User } from './User';

export class Adocao{
    _id: string;
    datahora: Date;
    Pet: pets;
    Pessoa: User;

    /**
     *
     */
    constructor() {
        this.Pessoa = new User();
        this.Pet = new pets();        
    }
}
