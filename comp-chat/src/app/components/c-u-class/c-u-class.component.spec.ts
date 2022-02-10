import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUClassComponent } from './c-u-class.component';

describe('CUClassComponent', () => {
  let component: CUClassComponent;
  let fixture: ComponentFixture<CUClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CUClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CUClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
