import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { StagiaireDto } from '../../dto/stagiaire-dto';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
	selector: 'app-stagiaire-form',
	templateUrl: './stagiaire-form.component.html',
	styleUrls: ['./stagiaire-form.component.scss'],
})
export class StagiaireFormComponent implements OnInit {

	stagiaireForm!: FormGroup;

	constructor(
		private stagiaireService: StagiaireService,
		private formBuilderService: FormBuilderService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.stagiaireForm = this.formBuilderService.build().getForm();
	}

	/**
	 * Returns a list of form controls
	 * @usage In template: c['lastname']
	 * instead of stagiaireForm.controls['lastname']
	 */
	public get c(): {[key: string]: AbstractControl} {
		return this.stagiaireForm.controls;
	}
	
	onSubmit() {
		console.log('Read from form: ',this.stagiaireForm.value);
		const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
		this.stagiaireService.add(dto).subscribe(() => {
			this.goHome();
		});
	}

	public goHome(): void {
		this.router.navigate(['/', 'home']);
	}
}
