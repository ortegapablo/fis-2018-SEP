import { Component, OnInit } from '@angular/core';
import { Nota } from '../nota';
import { NotaService } from '../nota.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: Nota[];
  notaSeleccionada: Nota;
  nuevaNota: Nota = {
    titulo: null,
    contenido: null,
    fecha: null
  };
  constructor(private notaService: NotaService) { }

  addNota(): void {
    this.notas.push(this.nuevaNota);
    this.nuevaNota = {
      titulo: null,
      contenido: null,
      fecha: null
    };
  }

  getNotas() {
  this.notaService.getNotas()
      .subscribe((notas) => {
        this.notas = notas;
      });
  }


  ngOnInit() {
    this.getNotas();
  }

}
