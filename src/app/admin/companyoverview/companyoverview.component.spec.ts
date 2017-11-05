import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyoverviewComponent } from './companyoverview.component';

describe('CompanyoverviewComponent', () => {
  let component: CompanyoverviewComponent;
  let fixture: ComponentFixture<CompanyoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
