import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { StagiaireDto } from 'src/app/stagiaires/dto/stagiaire-dto';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../models/stagiaire';

@Injectable({
	providedIn: 'root',
})
export class StagiaireService {
	private stagiaires: Array<Stagiaire> = [];
	private controllerBaseUrl: string = `${environment.apiBaseUrl}/trainee`;

	constructor(private httpClient: HttpClient) {}

	public findAll(): Observable<Stagiaire[]> {
		return this.httpClient.get<any>(
			`${this.controllerBaseUrl}`
		)
		.pipe(
			take(1),
			map((stagiaires: any[]) => {
				return stagiaires.map((inputStagiaire: any) => {
					const stagiaire: Stagiaire = new Stagiaire();
					stagiaire.setId(inputStagiaire.id);
					stagiaire.setLastName(inputStagiaire.lastName);
					stagiaire.setFirstName(inputStagiaire.firstName);
					stagiaire.setEmail(inputStagiaire.email);
					stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
					stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
					return stagiaire;
				});
			})
		)
	}

	public findOne(id: number): Observable<Stagiaire> {
		console.log('ze find ONe qui va bien');
		return this.httpClient.get<any>(`${this.controllerBaseUrl}/${id}`)
		.pipe(
			take(1),
			map((inputStagiaire: any) => {
				const stagiaire: Stagiaire = new Stagiaire();
				stagiaire.setId(inputStagiaire.id);
				stagiaire.setLastName(inputStagiaire.lastName);
				stagiaire.setFirstName(inputStagiaire.firstName);
				stagiaire.setEmail(inputStagiaire.email);
				stagiaire.setPhoneNumber(inputStagiaire.phoneNumber);
				stagiaire.setBirthDate(new Date(inputStagiaire.birthDate));
				return stagiaire;
			})
		)
	}

	public add(stagiaire: StagiaireDto): void {
		console.log("Service add stagiaire", stagiaire)
		this.httpClient.post<StagiaireDto>(this.controllerBaseUrl, stagiaire)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.log("Trainee not created", error);
				return throwError(() => new Error("Not Created"));
			})
		)
		.subscribe((res: any) => {
			console.log("Response ", res);
			// now we should add and display new result in table
		})
	}

	public getStagiaires(): Array<Stagiaire> {
		return this.stagiaires;
	}

	public delete(stagiaire: Stagiaire): void {
		console.log(`Le composant me demande de supprimer ${stagiaire.getLastName()}`);
		this.httpClient.delete(`${this.controllerBaseUrl}/${stagiaire.getId()}`).subscribe((res: any) => {
			console.log('yata')
		})
		// const stagiaireIndex: number = this.stagiaires.findIndex((obj: Stagiaire) => obj.getId() === stagiaire.getId());
		// this.stagiaires.splice(stagiaireIndex, 1);
	}

	public getVisibleStagiaireNumber(date: Date | null): number {
		if (date === null) {
		  	return this.stagiaires.length;
		}
	
    	return (date.getDate() === 31) ? 
      	this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      	this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length
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

		stagiaire = new Stagiaire();
		stagiaire.setId(3);
		stagiaire.setLastName('Bond');
		stagiaire.setFirstName('James');
		stagiaire.setPhoneNumber('+(33)7 07 07 07 07');
		stagiaire.setEmail('james.bond@mi6.co.uk');
		stagiaire.setBirthDate(new Date(1945, 5, 7));
		this.stagiaires.push(stagiaire);
	}
}
