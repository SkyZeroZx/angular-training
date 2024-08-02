import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ay11Module } from './a11y.module';
import { By } from '@angular/platform-browser';
import { ButtonAy11Directive } from './button-a11y.directive';

//Test Component for Directive
@Component({
  template: ` <div id="div-button" role="button">I am a button how div</div> `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentA11Y {}

describe('ButtonAy11Directive', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: TestComponentA11Y;
  let fixture: ComponentFixture<TestComponentA11Y>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
			declarations: [TestComponentA11Y],
			imports: [CommonModule, ButtonAy11Directive]
		}).compileComponents();

    fixture = TestBed.createComponent(TestComponentA11Y);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create component test', () => {
    expect(fixture).toBeTruthy();
  });

  it('should emit events when realize enter or space in role button', () => {
    const elementDivButton = fixture.debugElement.query(By.css('#div-button'));

    const spyA11yClick = jest.spyOn(
      elementDivButton.injector.get(ButtonAy11Directive).click,
      'emit'
    );

    const spyA11yAction = jest.spyOn(
      elementDivButton.injector.get(ButtonAy11Directive).a11yAction,
      'emit'
    );

    // Simulate Enter key press
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    elementDivButton.triggerEventHandler('keydown', enterEvent);
    fixture.detectChanges();

    expect(spyA11yClick).toHaveBeenCalled();
    expect(spyA11yAction).toHaveBeenCalled();

    // Simulate Space key press
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    elementDivButton.triggerEventHandler('keydown', spaceEvent);
    fixture.detectChanges();

    expect(spyA11yClick).toHaveBeenCalledTimes(2);
    expect(spyA11yAction).toHaveBeenCalledTimes(2);
  });
});
