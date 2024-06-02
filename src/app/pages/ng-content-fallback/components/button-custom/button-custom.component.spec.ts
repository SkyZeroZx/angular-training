import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCustomComponent } from './button-custom.component';

describe('ButtonCustomComponent', () => {
  let component: ButtonCustomComponent;
  let fixture: ComponentFixture<ButtonCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
