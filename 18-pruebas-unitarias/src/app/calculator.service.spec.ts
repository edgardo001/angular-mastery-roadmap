import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  it('should add two numbers', () => {
    expect(service.add(2, 3)).toBe(5);
    expect(service.result()).toBe(5);
    expect(service.lastOperation()).toBe('add');
  });

  it('should subtract two numbers', () => {
    expect(service.subtract(10, 4)).toBe(6);
    expect(service.result()).toBe(6);
    expect(service.lastOperation()).toBe('subtract');
  });

  it('should multiply two numbers', () => {
    expect(service.multiply(3, 4)).toBe(12);
    expect(service.result()).toBe(12);
    expect(service.lastOperation()).toBe('multiply');
  });

  it('should divide two numbers', () => {
    expect(service.divide(10, 2)).toBe(5);
    expect(service.result()).toBe(5);
    expect(service.lastOperation()).toBe('divide');
  });

  it('should throw error on division by zero', () => {
    expect(() => service.divide(5, 0)).toThrowError('Cannot divide by zero');
  });

  it('should clear result and last operation', () => {
    service.add(5, 3);
    service.clear();
    expect(service.result()).toBe(0);
    expect(service.lastOperation()).toBe('');
  });
});
