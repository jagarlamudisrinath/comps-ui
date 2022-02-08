import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantProfessorDashboardComponent } from './assistant-professor-dashboard.component';

describe('AssistantProfessorDashboardComponent', () => {
  let component: AssistantProfessorDashboardComponent;
  let fixture: ComponentFixture<AssistantProfessorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantProfessorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantProfessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
