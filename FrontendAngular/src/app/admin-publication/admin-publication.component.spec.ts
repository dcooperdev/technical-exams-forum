import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicationComponent } from './admin-publication.component';

describe('AdminPublicationComponent', () => {
  let component: AdminPublicationComponent;
  let fixture: ComponentFixture<AdminPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
