import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployesComponent } from './update-employes.component';

describe('UpdateEmployesComponent', () => {
  let component: UpdateEmployesComponent;
  let fixture: ComponentFixture<UpdateEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEmployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
