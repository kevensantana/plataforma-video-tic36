import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    // Inicializa e obtém o perfil atualizado do usuário
    this.userProfileService.initializeUserProfile().subscribe(profile => {
      this.profile = profile;
    });
  }
}
