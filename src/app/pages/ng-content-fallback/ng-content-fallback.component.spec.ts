import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentFallbackComponent } from './ng-content-fallback.component';

describe('NgContentFallbackComponent', () => {
  let component: NgContentFallbackComponent;
  let fixture: ComponentFixture<NgContentFallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NgContentFallbackComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(NgContentFallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
