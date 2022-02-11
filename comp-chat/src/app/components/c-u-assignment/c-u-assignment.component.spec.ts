import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUAssignmentComponent } from './c-u-assignment.component';

describe('CUAssignmentComponent', () => {
  let component: CUAssignmentComponent;
  let fixture: ComponentFixture<CUAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CUAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
