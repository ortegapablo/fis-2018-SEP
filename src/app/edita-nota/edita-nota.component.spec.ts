import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaNotaComponent } from './edita-nota.component';

describe('EditaNotaComponent', () => {
  let component: EditaNotaComponent;
  let fixture: ComponentFixture<EditaNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
