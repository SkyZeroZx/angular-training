import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdSliderComponent } from './third-slider.component';

describe('ThirdSliderComponent', () => {
  let component: ThirdSliderComponent;
  let fixture: ComponentFixture<ThirdSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
