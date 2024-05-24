import { AuthLogin } from '@/core/interface/auth';
import { TypedFormControls } from '@/core/interface/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@/services/auth';
import { Router } from '@angular/router';
import { ToastService } from '@/shared/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<TypedFormControls<AuthLogin>>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required , Validators.minLength(2)]),
      password: this.fb.control('', [Validators.required , Validators.minLength(5) , Validators.maxLength(25)]),
    });
  }

  logIn() {
    this.authService.logIn(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.toastService.success({
          title: 'Exito',
          message: 'Usuario logeado exitosamente',
        });
        this.router.navigate(['product']);
      },
    });
  }
}
