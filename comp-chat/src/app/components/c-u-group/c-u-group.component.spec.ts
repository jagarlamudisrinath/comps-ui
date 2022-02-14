import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUGroupComponent } from './c-u-group.component';

describe('CUGroupComponent', () => {
  let component: CUGroupComponent;
  let fixture: ComponentFixture<CUGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CUGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
