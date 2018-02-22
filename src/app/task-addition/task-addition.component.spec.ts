import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAdditionComponent } from './task-addition.component';

describe('TaskAdditionComponent', () => {
  let component: TaskAdditionComponent;
  let fixture: ComponentFixture<TaskAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAdditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
