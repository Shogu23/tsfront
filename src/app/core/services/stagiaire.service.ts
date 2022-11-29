import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

	public add(stagiaire: StagiaireDto): Observable<Stagiaire> {
		console.log("Service add stagiaire", stagiaire)
		return this.httpClient.post<StagiaireDto>(this.controllerBaseUrl, stagiaire)
		.pipe(
			take(1),
			map((stagiaireDto: StagiaireDto) =>{
				const stagiaire: Stagiaire = new Stagiaire();
				stagiaire.setId(stagiaireDto.id!);
				stagiaire.setLastName(stagiaireDto.lastName);
				stagiaire.setFirstName(stagiaireDto.firstName);
				stagiaire.setBirthDate(new Date(stagiaireDto.birthDate));
				stagiaire.setPhoneNumber(stagiaireDto.phoneNumber);
				stagiaire.setEmail(stagiaireDto.email);
				return stagiaire;
			})
		)
	}
	
	public delete(stagiaire: Stagiaire): Observable<HttpResponse<any>> {
		console.log(`Le composant me demande de supprimer ${stagiaire.getLastName()} son id: ${stagiaire.getId()}`);
		return this.httpClient.delete(`${this.controllerBaseUrl}/${stagiaire.getId()}`,	{ observe: 'response' });
		// const stagiaireIndex: number = this.stagiaires.findIndex((obj: Stagiaire) => obj.getId() === stagiaire.getId());
		// this.stagiaires.splice(stagiaireIndex, 1);
	}

	public getStagiaires(): Array<Stagiaire> {
		return this.stagiaires;
	}

	public getVisibleStagiaireNumber(date: Date | null): number {
		if (date === null) {
		  	return this.stagiaires.length;
		}
	
    	return (date.getDate() === 31) ? 
      	this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() > date).length :
      	this.stagiaires.filter((obj: Stagiaire) => obj.getBirthDate() < date).length
	}
}
