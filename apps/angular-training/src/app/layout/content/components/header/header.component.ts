import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@/services/auth';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user = this.authService.authUser;
  constructor(private readonly authService: AuthService) {}

  logOut() {
    this.authService.logOut();
  }
}
