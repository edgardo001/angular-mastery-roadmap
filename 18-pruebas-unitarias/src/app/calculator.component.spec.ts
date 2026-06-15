import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CalculatorService } from './calculator.service';
import { AppComponent } from './app.component';

describe('CalculatorComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [CalculatorService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toContain('Calculadora');
  });

  it('should calculate add operation', () => {
    component.a = 10;
    component.b = 5;
    component.operation = 'add';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('15');
  });

  it('should calculate subtract operation', () => {
    component.a = 10;
    component.b = 5;
    component.operation = 'subtract';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('5');
  });

  it('should calculate multiply operation', () => {
    component.a = 4;
    component.b = 3;
    component.operation = 'multiply';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('12');
  });

  it('should calculate divide operation', () => {
    component.a = 20;
    component.b = 4;
    component.operation = 'divide';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('5');
  });

  it('should show error on division by zero', () => {
    component.a = 5;
    component.b = 0;
    component.operation = 'divide';
    component.calculate();
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error.textContent).toContain('Cannot divide by zero');
  });

  it('should clear values', () => {
    component.a = 10;
    component.b = 5;
    component.calculate();
    component.clear();
    fixture.detectChanges();
    expect(component.a).toBe(0);
    expect(component.b).toBe(0);
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('0');
  });
});
