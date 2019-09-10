import { Component, OnInit, Input } from '@angular/core';
import { Nota } from '../nota';
import { NotaService } from '../nota.service';
@Component({
  selector: '[app-edita-nota]',
  templateUrl: './edita-nota.component.html',
  styleUrls: ['./edita-nota.component.css']
})
export class EditaNotaComponent implements OnInit {

  @Input() nota: Nota;
  editable = false;

  constructor(private notaService: NotaService) { }

  onEdit() {
    if (this.editable) {
      this.notaService.putNota(this.nota)
        .subscribe(() => this.editable = !this.editable)
    } else {
      this.editable = !this.editable;
    }
  }
  deleteNota() {
    this.notaService.deleteNota(this.nota).subscribe(() => {
      location.reload();
    });
  }
  ngOnInit() {
  }

}
