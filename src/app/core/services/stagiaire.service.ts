import { Injectable } from '@angular/core';
import { Stagiaire } from '../models/stagiaire';

@Injectable({
	providedIn: 'root',
})
export class StagiaireService {
	private stagiaires: Array<Stagiaire> = [];

	constructor() {
		this.feedIt();
	}

	public getStagiaires(): Array<Stagiaire> {
		return this.stagiaires;
	}

	public delete(stagiaire: Stagiaire): void {
		console.log(`Le composant me demande de supprimer ${stagiaire.getLastName()}`);
		const stagiaireIndex: number = this.stagiaires.findIndex((obj: Stagiaire) => obj.getId() === stagiaire.getId());
		this.stagiaires.splice(stagiaireIndex, 1);
	}

	private feedIt(): void {
		let stagiaire: Stagiaire = new Stagiaire();
		stagiaire.setId(1);
		stagiaire.setLastName('Aubert');
		stagiaire.setFirstName('Jean-Luc');
		stagiaire.setPhoneNumber('+(33)7 82 92 93 55');
		stagiaire.setEmail('jla.webproject@gmail.com');
		stagiaire.setBirthDate(new Date(1968, 3, 30));

		this.stagiaires.push(stagiaire);

		stagiaire = new Stagiaire();
		stagiaire.setId(2);
		stagiaire.setLastName('Marthouret');
		stagiaire.setFirstName('Charles');
		stagiaire.setPhoneNumber('+(33)6 27 98 93 55');
		stagiaire.setEmail('cmarthouret@gmail.com');
		stagiaire.setBirthDate(new Date(1985, 5, 19));
		
		this.stagiaires.push(stagiaire);
	}
}
