import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from 'src/app/Service/pets.service';
import { pets } from 'src/model/pets';
import { PetsComponent } from '../pets.component';

@Component({
  selector: 'app-form-pets',
  templateUrl: './form-pets.component.html',
  styleUrls: ['./form-pets.component.css']
})
export class FormPetsComponent implements OnInit {

  mensagem = '';
  id: string;
  pet = new pets();

  constructor(private petService: PetsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = '' + this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.preenchePet(this.id);
      console.log(this.pet);
    }

  }

  preenchePet(id: string) {
    this.petService.BuscarPorId(this.id).subscribe(dado => this.pet = dado);
  }

  cadastrar(_id: string) {
    if (!_id) {
      this.petService.AddPet(this.pet).subscribe(
        ok => {
          this.mensagem = ok.apelido + ' cadastrado com sucesso';
        },
        err=> {
          this.mensagem = this.pet.apelido + 'Falha ao cadastrar';
        });
      this.pet = new pets();
    } else {
      this.petService.EditarPet(this.id, this.pet).subscribe(ok => {
        this.mensagem = this.pet.apelido + ' editado com sucesso';
      },
      err=> {
        this.mensagem = this.pet.apelido + 'Falha ao editar';
      });
    }
  }

  cancelar() {
    this.router.navigate(['/pets']);
    // this.router.navigate(['/produtos/edit', '1']);
  }

}
