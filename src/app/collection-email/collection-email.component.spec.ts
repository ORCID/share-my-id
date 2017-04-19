import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEmailComponent } from './collection-email.component';

describe('CollectionEmailComponent', () => {
  let component: CollectionEmailComponent;
  let fixture: ComponentFixture<CollectionEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
