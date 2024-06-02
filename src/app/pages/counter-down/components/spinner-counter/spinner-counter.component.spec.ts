import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerCounterComponent } from './spinner-counter.component';

describe('SpinnerCounterComponent', () => {
  let component: SpinnerCounterComponent;
  let fixture: ComponentFixture<SpinnerCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
