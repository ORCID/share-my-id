import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionLinksComponent } from './collection-links.component';

describe('CollectionLinksComponent', () => {
  let component: CollectionLinksComponent;
  let fixture: ComponentFixture<CollectionLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
