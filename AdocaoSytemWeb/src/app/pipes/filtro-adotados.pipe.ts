import { Pipe, PipeTransform } from '@angular/core';
import { pets } from 'src/model/pets';

@Pipe({
  name: 'filtroAdotados'
})
export class FiltroAdotadosPipe implements PipeTransform {

  transform(value: pets[]): pets[] {
    return value.filter(x => x.adotado == false);;
  }

}
