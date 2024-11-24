import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerEmployesComponent } from './lister-employes.component';

describe('ListerEmployesComponent', () => {
  let component: ListerEmployesComponent;
  let fixture: ComponentFixture<ListerEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListerEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
