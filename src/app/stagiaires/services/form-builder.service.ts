import { Inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Injectable({
	providedIn: 'root',
})
export class FormBuilderService {

	private form!: FormGroup;
	private stagiaire: Stagiaire = new Stagiaire();
	private updateMode: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private adapter: DateAdapter<any>,
    	@Inject(MAT_DATE_LOCALE) private locale: string
	) {
		this.locale = 'fr';
    	this.adapter.setLocale(this.locale);
	}

	public getForm(): FormGroup {
		return this.form;
	}

	public build(stagiaire: Stagiaire): FormBuilderService {
		this.stagiaire = stagiaire;
		if (this.stagiaire.getId() !== 0) {
			this.updateMode = true;
		}
		this.form = this.formBuilder.group({
			lastName: [this.stagiaire.getLastName(), [Validators.required]],
			firstName: [this.stagiaire.getFirstName(), [Validators.required]],
			email: [this.stagiaire.getEmail(), [Validators.required, Validators.email]],
			phoneNumber: [this.stagiaire.getPhoneNumber(), [Validators.pattern("^[\\+]?[(]?\\d{3}[)]?[-\\s\\.]?\\d{3}[-\\s\\.]?\\d{4,6}$")]],
			birthDate: [this.stagiaire.getBirthDate() !== null ? this.stagiaire.getBirthDate() : '']
		});

		if (this.updateMode) {
			const idControl: AbstractControl = new FormControl(this.stagiaire.getId());
			this.form.addControl('id', idControl);
		}

		return this; // To chain methods
	}
}
