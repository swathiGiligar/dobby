import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtaskComponent } from './ptask.component';

describe('PtaskComponent', () => {
  let component: PtaskComponent;
  let fixture: ComponentFixture<PtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
