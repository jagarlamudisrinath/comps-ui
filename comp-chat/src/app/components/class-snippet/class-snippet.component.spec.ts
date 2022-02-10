import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSnippetComponent } from './class-snippet.component';

describe('ClassSnippetComponent', () => {
  let component: ClassSnippetComponent;
  let fixture: ComponentFixture<ClassSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
