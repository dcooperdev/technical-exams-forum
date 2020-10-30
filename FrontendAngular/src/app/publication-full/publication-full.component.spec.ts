import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationFullComponent } from './publication-full.component';

describe('PublicationFullComponent', () => {
  let component: PublicationFullComponent;
  let fixture: ComponentFixture<PublicationFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
