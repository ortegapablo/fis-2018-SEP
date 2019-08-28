import { Component, OnInit, Input } from '@angular/core';
import { Nota } from '../nota'
@Component({
  selector: '[app-edita-nota]',
  templateUrl: './edita-nota.component.html',
  styleUrls: ['./edita-nota.component.css']
})
export class EditaNotaComponent implements OnInit {

  @Input() nota: Nota;
  editable = false;

  constructor() { }

  onEdit() {
    this.editable = ! this.editable;
    
  }
  ngOnInit() {
  }

}
