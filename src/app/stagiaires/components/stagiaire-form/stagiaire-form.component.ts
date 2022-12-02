import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
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
	public addMode: boolean = true;

	constructor(
		private stagiaireService: StagiaireService,
		private formBuilderService: FormBuilderService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.addMode = this.route.snapshot.paramMap.get('id') ? false : true;

		const data = this.route.snapshot.data;
		this.stagiaireForm = data['formAddEdit'];
		console.log('dans mon init ', this.stagiaireForm)
		
		// console.log(`${data['formAddEdit'] instanceof FormGroup ? 'OK' : 'KO'}`)
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
		console.log('dans mon submit ', this.stagiaireForm)
		let subscription: Observable<any>;

		if (this.addMode) {
			const dto: StagiaireDto = new StagiaireDto(this.stagiaireForm.value);
			subscription = this.stagiaireService.add(dto)
		} else {
			subscription = this.stagiaireService.update(this.stagiaireForm.value)
		}

		subscription.subscribe(() => this.goHome());
	}

	public goHome(): void {
		this.router.navigate(['/', 'home']);
	}
}
