import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDownComponent } from './counter-down.component';

describe('CounterDownComponent', () => {
  let component: CounterDownComponent;
  let fixture: ComponentFixture<CounterDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CounterDownComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
