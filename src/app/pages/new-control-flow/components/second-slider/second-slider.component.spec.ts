import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSliderComponent } from './second-slider.component';

describe('SecondSliderComponent', () => {
  let component: SecondSliderComponent;
  let fixture: ComponentFixture<SecondSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
