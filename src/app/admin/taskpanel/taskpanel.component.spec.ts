import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskpanelComponent } from './taskpanel.component';

describe('TaskpanelComponent', () => {
  let component: TaskpanelComponent;
  let fixture: ComponentFixture<TaskpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
