import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeatonComponent } from './peaton.component';

describe('PeatonComponent', () => {
  let component: PeatonComponent;
  let fixture: ComponentFixture<PeatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeatonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
