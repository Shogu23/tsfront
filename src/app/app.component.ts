import { Component } from '@angular/core';
import { Stagiaire } from './core/models/stagiaire';
import { StagiaireService } from './core/services/stagiaire.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  	public title = 'Suivi des stagiaires';

	public stagiaires: Array<Stagiaire> = this.stagiaireService.getStagiaires();

	public constructor(
		private stagiaireService: StagiaireService
	) {};

	public toggleTitle(): void {
		(this.title === 'Suivi des stagiaires') ? this.title = 'Hello Angular' : this.title = 'Suivi des stagiaires'
	}
	
	public addStagiaire(): void {};
}
