import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';
import { UserService } from './user/services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public title = 'Suivi des stagiaires';
	public inputType: string = 'password';
	public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();
	public hasUser: boolean = false;

	public constructor(
		private stagiaireService: StagiaireService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.userService.hasUser().subscribe((hasUser: boolean) => {
			this.hasUser = hasUser;
		});
	}

	public onLogout(): void {
		this.userService.logout();
	}

	public toggleTitle(): void {
		this.title === 'Suivi des stagiaires' ? (this.title = 'Hello Angular') : (this.title = 'Suivi des stagiaires');
	}

	public showPassword(): void {
		if (this.inputType === 'password') {
			this.inputType = 'text';
			setTimeout(
				() => {
				  this.inputType = 'password'
				},
				800
			)
		} else {
			this.inputType = 'password';
		}
	}

	public addStagiaire(): void {}
}
