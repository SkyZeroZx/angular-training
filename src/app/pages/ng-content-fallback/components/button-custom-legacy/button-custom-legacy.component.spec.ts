import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCustomLegacyComponent } from './button-custom-legacy.component';

describe('ButtonCustomLegacyComponent', () => {
  let component: ButtonCustomLegacyComponent;
  let fixture: ComponentFixture<ButtonCustomLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCustomLegacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCustomLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
