import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdSuccessComponent } from './add-id-success.component';

describe('AddIdSuccessComponent', () => {
  let component: AddIdSuccessComponent;
  let fixture: ComponentFixture<AddIdSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIdSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
