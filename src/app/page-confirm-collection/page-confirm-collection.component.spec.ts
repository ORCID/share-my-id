import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConfirmCollectionComponent } from './page-confirm-collection.component';

describe('PageConfirmCollectionComponent', () => {
  let component: PageConfirmCollectionComponent;
  let fixture: ComponentFixture<PageConfirmCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageConfirmCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConfirmCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
