import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDownLegacyComponent } from './counter-down-legacy.component';

describe('CounterDownLegacyComponent', () => {
  let component: CounterDownLegacyComponent;
  let fixture: ComponentFixture<CounterDownLegacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterDownLegacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterDownLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
