import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerMedicamentComponent } from './lister-medicament.component';

describe('ListerMedicamentComponent', () => {
  let component: ListerMedicamentComponent;
  let fixture: ComponentFixture<ListerMedicamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListerMedicamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
