import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddMyIdComponent } from './page-add-my-id.component';

describe('PageAddMyIdComponent', () => {
  let component: PageAddMyIdComponent;
  let fixture: ComponentFixture<PageAddMyIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddMyIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddMyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
