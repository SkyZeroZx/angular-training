import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacySpinnerCounterComponent } from './legacy-spinner-counter.component';

describe('LegacySpinnerCounterComponent', () => {
  let component: LegacySpinnerCounterComponent;
  let fixture: ComponentFixture<LegacySpinnerCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegacySpinnerCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegacySpinnerCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
