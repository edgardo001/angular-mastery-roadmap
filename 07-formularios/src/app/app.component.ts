import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Registro Multi-step</h1>

      <div class="steps">
        <button
          class="step-btn"
          [class.active]="currentStep === 1"
          (click)="goToStep(1)"
        >1. Personal</button>
        <button
          class="step-btn"
          [class.active]="currentStep === 2"
          (click)="goToStep(2)"
        >2. Contacto</button>
        <button
          class="step-btn"
          [class.active]="currentStep === 3"
          (click)="goToStep(3)"
        >3. Password</button>
        <button
          class="step-btn"
          [class.active]="currentStep === 4"
          (click)="goToStep(4)"
        >Resumen</button>
      </div>

      <form [formGroup]="registrationForm" class="form-card">

        @if (currentStep === 1) {
          <div formGroupName="personalInfo" class="step">
            <h2>Información Personal</h2>

            <label>
              Nombre *
              <input formControlName="name" type="text" />
              @if (personalInfo.get('name')?.invalid && personalInfo.get('name')?.touched) {
                <span class="error">El nombre es requerido</span>
              }
            </label>

            <label>
              Email *
              <input formControlName="email" type="email" />
              @if (personalInfo.get('email')?.pending) {
                <span class="pending">Verificando disponibilidad...</span>
              }
              @if (personalInfo.get('email')?.invalid && personalInfo.get('email')?.touched) {
                @if (personalInfo.get('email')?.errors?.['email']) {
                  <span class="error">Email inválido</span>
                }
                @if (personalInfo.get('email')?.errors?.['required']) {
                  <span class="error">El email es requerido</span>
                }
              }
              @if (personalInfo.get('email')?.errors?.['emailTaken']) {
                <span class="error">El email ya está registrado</span>
              }
            </label>

            <label>
              Edad *
              <input formControlName="age" type="number" />
              @if (personalInfo.get('age')?.invalid && personalInfo.get('age')?.touched) {
                @if (personalInfo.get('age')?.errors?.['required']) {
                  <span class="error">La edad es requerida</span>
                }
                @if (personalInfo.get('age')?.errors?.['min']) {
                  <span class="error">Debes tener al menos 18 años</span>
                }
              }
            </label>
          </div>
        }

        @if (currentStep === 2) {
          <div formGroupName="contact" class="step">
            <h2>Contacto</h2>

            <label>
              Dirección
              <input formControlName="address" type="text" />
            </label>

            <div formArrayName="phones" class="phones">
              <h3>Teléfonos</h3>
              @for (phone of phones.controls; track phone; let i = $index) {
                <div class="phone-row">
                  <label>
                    Teléfono {{ i + 1 }}
                    <input [formControlName]="i" type="text" placeholder="+521234567890" />
                    @if (phone.invalid && phone.touched) {
                      @if (phone.errors?.['required']) {
                        <span class="error">Requerido</span>
                      }
                      @if (phone.errors?.['pattern']) {
                        <span class="error">Formato: +521234567890</span>
                      }
                    }
                  </label>
                  <button type="button" class="btn-remove" (click)="removePhone(i)">X</button>
                </div>
              }
              <button type="button" class="btn-add" (click)="addPhone()">+ Agregar teléfono</button>
            </div>
          </div>
        }

        @if (currentStep === 3) {
          <div formGroupName="password" class="step">
            <h2>Contraseña</h2>

            <label>
              Contraseña *
              <input formControlName="password" type="password" />
              @if (passwordGroup.get('password')?.invalid && passwordGroup.get('password')?.touched) {
                @if (passwordGroup.get('password')?.errors?.['required']) {
                  <span class="error">La contraseña es requerida</span>
                }
                @if (passwordGroup.get('password')?.errors?.['minlength']) {
                  <span class="error">Mínimo 6 caracteres</span>
                }
              }
            </label>

            <label>
              Confirmar Contraseña *
              <input formControlName="confirmPassword" type="password" />
              @if (passwordGroup.get('confirmPassword')?.touched) {
                @if (passwordGroup.get('confirmPassword')?.errors?.['required']) {
                  <span class="error">Confirma tu contraseña</span>
                }
              }
              @if (passwordGroup.errors?.['passwordsMismatch'] && passwordGroup.get('confirmPassword')?.touched) {
                <span class="error">Las contraseñas no coinciden</span>
              }
            </label>
          </div>
        }

        @if (currentStep === 4) {
          <div class="step summary">
            <h2>Resumen</h2>
            <div class="summary-field"><strong>Nombre:</strong> {{ personalInfo.get('name')?.value }}</div>
            <div class="summary-field"><strong>Email:</strong> {{ personalInfo.get('email')?.value }}</div>
            <div class="summary-field"><strong>Edad:</strong> {{ personalInfo.get('age')?.value }}</div>
            <div class="summary-field"><strong>Dirección:</strong> {{ contact.get('address')?.value }}</div>
            <div class="summary-field">
              <strong>Teléfonos:</strong>
              @if (phones.length) {
                <ul>
                  @for (phone of phones.controls; track phone) {
                    <li>{{ phone.value }}</li>
                  }
                </ul>
              } @else {
                <span>Ninguno</span>
              }
            </div>
            <div class="summary-field"><strong>Contraseña:</strong> ******</div>
            @if (submitted) {
              <div class="success">¡Registro completado exitosamente!</div>
            }
          </div>
        }

      </form>

      <div class="nav-buttons">
        @if (currentStep > 1) {
          <button class="btn btn-back" (click)="prevStep()">Anterior</button>
        }
        @if (currentStep < 4) {
          <button class="btn btn-next" (click)="nextStep()">Siguiente</button>
        }
        @if (currentStep === 4 && !submitted) {
          <button class="btn btn-submit" (click)="onSubmit()">Registrarse</button>
        }
      </div>

      <div class="demo-buttons">
        <button class="btn btn-demo" (click)="loadDemoData()">Cargar Demo (patchValue)</button>
        <button class="btn btn-demo" (click)="resetForm()">Resetear Formulario</button>
      </div>

      <div class="debug-panel">
        <h3>Debug</h3>
        <div><strong>Form Status:</strong> <span class="status-badge" [class.valid]="registrationForm.valid">{{ formStatusDisplay }}</span></div>
        <div><strong>Form Value:</strong></div>
        <pre class="debug-json">{{ formValueDisplay }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 700px; margin: 2rem auto; padding: 1rem; }
    h1 { text-align: center; margin-bottom: 1.5rem; color: #1a1a2e; }
    h2 { margin-bottom: 1rem; color: #16213e; }
    label { display: block; margin-bottom: 1rem; font-weight: 500; color: #333; }
    input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; margin-top: 0.25rem; }
    input:focus { outline: none; border-color: #0f3460; box-shadow: 0 0 0 2px rgba(15,52,96,0.15); }
    .error { display: block; color: #e63946; font-size: 0.8rem; margin-top: 0.25rem; font-weight: 400; }
    .pending { display: block; color: #e9c46a; font-size: 0.8rem; margin-top: 0.25rem; font-weight: 400; }
    .success { background: #d4edda; color: #155724; padding: 1rem; border-radius: 6px; margin-top: 1rem; text-align: center; font-weight: 600; }
    .steps { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
    .step-btn { flex: 1; padding: 0.6rem; border: 2px solid #ddd; background: #fff; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s; color: #666; }
    .step-btn.active { border-color: #0f3460; background: #0f3460; color: #fff; }
    .form-card { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .step { min-height: 220px; }
    .phone-row { display: flex; gap: 0.5rem; align-items: flex-start; margin-bottom: 0.5rem; }
    .phone-row label { flex: 1; margin-bottom: 0; }
    .btn-remove { margin-top: 1.5rem; padding: 0.35rem 0.7rem; background: #e63946; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 700; }
    .btn-add { padding: 0.4rem 1rem; background: #2a9d8f; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem; }
    .nav-buttons { display: flex; justify-content: space-between; margin-top: 1rem; gap: 1rem; }
    .btn { padding: 0.6rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-back { background: #e0e0e0; color: #333; }
    .btn-next { background: #0f3460; color: #fff; margin-left: auto; }
    .btn-submit { background: #2a9d8f; color: #fff; width: 100%; }
    .demo-buttons { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .btn-demo { flex: 1; background: #e2e8f0; color: #333; font-size: 0.85rem; padding: 0.5rem; }
    .debug-panel { margin-top: 1.5rem; background: #1a1a2e; color: #e0e0e0; border-radius: 8px; padding: 1rem; font-family: 'Consolas', monospace; font-size: 0.8rem; }
    .debug-panel h3 { color: #e9c46a; margin-bottom: 0.5rem; }
    .status-badge { padding: 0.15rem 0.5rem; border-radius: 4px; background: #e63946; color: #fff; font-weight: 600; }
    .status-badge.valid { background: #2a9d8f; }
    .debug-json { background: #0d1b2a; padding: 0.5rem; border-radius: 4px; margin-top: 0.25rem; white-space: pre-wrap; word-break: break-all; }
    .summary-field { margin-bottom: 0.5rem; padding: 0.4rem 0; border-bottom: 1px solid #eee; }
    .summary ul { margin: 0.25rem 0 0 1.5rem; }
    .summary ul li { margin-bottom: 0.15rem; }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  currentStep = 1;
  submitted = false;

  formStatusDisplay = '';
  formValueDisplay = '';

  private valueSub?: Subscription;
  private statusSub?: Subscription;

  registrationForm = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [this.emailUniqueValidator()], updateOn: 'blur' }),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
    }),
    contact: new FormGroup({
      address: new FormControl(''),
      phones: new FormArray<FormControl<string | null>>([]),
    }),
    password: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator }),
  });

  get personalInfo(): FormGroup {
    return this.registrationForm.get('personalInfo') as FormGroup;
  }

  get contact(): FormGroup {
    return this.registrationForm.get('contact') as FormGroup;
  }

  get passwordGroup(): FormGroup {
    return this.registrationForm.get('password') as FormGroup;
  }

  get phones(): FormArray {
    return this.contact.get('phones') as FormArray;
  }

  ngOnInit(): void {
    this.valueSub = this.registrationForm.valueChanges.subscribe(v => {
      this.formValueDisplay = JSON.stringify(v, null, 2);
    });

    this.statusSub = this.registrationForm.statusChanges.subscribe(s => {
      this.formStatusDisplay = s;
    });

    this.formValueDisplay = JSON.stringify(this.registrationForm.value, null, 2);
    this.formStatusDisplay = this.registrationForm.status;
  }

  ngOnDestroy(): void {
    this.valueSub?.unsubscribe();
    this.statusSub?.unsubscribe();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pwd = control.get('password');
    const confirm = control.get('confirmPassword');
    if (!pwd || !confirm) return null;
    return pwd.value !== confirm.value ? { passwordsMismatch: true } : null;
  }

  emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!control.value) return Promise.resolve(null);
      return new Promise(resolve => {
        setTimeout(() => {
          const taken = ['test@test.com', 'admin@test.com'];
          resolve(taken.includes(control.value) ? { emailTaken: true } : null);
        }, 1000);
      });
    };
  }

  addPhone(): void {
    this.phones.push(new FormControl('', [Validators.required, Validators.pattern(/^\+\d{7,15}$/)]));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  private markStepTouched(group: FormGroup): void {
    Object.values(group.controls).forEach(c => {
      if (c instanceof FormArray) {
        c.controls.forEach(cc => cc.markAsTouched());
      } else {
        c.markAsTouched();
      }
    });
  }

  goToStep(step: number): void {
    if (step < this.currentStep) {
      this.currentStep = step;
      return;
    }

    if (step === this.currentStep + 1 || step === this.currentStep) {
      this.currentStep = step;
    }
  }

  nextStep(): void {
    const stepGroups = [this.personalInfo, this.contact, this.passwordGroup];
    const group = stepGroups[this.currentStep - 1];
    this.markStepTouched(group);

    if (group.invalid) return;

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  loadDemoData(): void {
    this.registrationForm.patchValue({
      personalInfo: {
        name: 'Edgardo Demo',
        email: 'demo@email.com',
        age: '25',
      },
      contact: {
        address: 'Calle Principal 123',
      },
      password: {
        password: '123456',
        confirmPassword: '123456',
      },
    });

    this.phones.clear();
    this.addPhone();
    this.phones.at(0)?.setValue('+521234567890');

    this.currentStep = 4;
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.phones.clear();
    this.currentStep = 1;
    this.submitted = false;
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      Object.keys(this.registrationForm.controls).forEach(key => {
        const group = this.registrationForm.get(key) as FormGroup;
        if (group instanceof FormGroup) {
          this.markStepTouched(group);
        }
      });
      return;
    }
    this.submitted = true;
  }
}
