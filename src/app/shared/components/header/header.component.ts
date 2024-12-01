import { Component, Inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, RouterLink, RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAuthenticated$ = this.auth.isAuthenticated$; 
  profile: any;

  constructor(@Inject(AuthService) public auth: AuthService) {}

  ngOnInit(): void {
    // Obtenha o perfil do usuário se autenticado
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }
}
