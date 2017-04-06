import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdErrorComponent } from './add-id-error.component';

describe('AddIdErrorComponent', () => {
  let component: AddIdErrorComponent;
  let fixture: ComponentFixture<AddIdErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIdErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIdErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
