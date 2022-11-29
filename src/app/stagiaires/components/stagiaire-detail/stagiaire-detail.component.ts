import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { HandleDetailService } from 'src/app/shared/directives/handle-detail.service';

@Component({
	selector: 'app-stagiaire-detail',
	templateUrl: './stagiaire-detail.component.html',
	styleUrls: ['./stagiaire-detail.component.scss'],
})
export class StagiaireDetailComponent implements OnInit {

	@Input() public stagiaire!: Stagiaire;

	public bubbleConfig: any = {
		height: '3em',
		width: '3em',
		lineHeight: '3em', // equiv css : line-height
		backgroundColor: 'rgba(200, 20, 20, .5)',
		borderColor: 'darken(rgba(200, 20, 20, .5)), 25%)',
		borderStyle: 'solid',
		color: '#fff',
		fontFamily: 'Arial, Helvetica, sans-serif',
	}

	constructor(
		private handleDetailService: HandleDetailService,
		private route: ActivatedRoute,
		private router: Router,
		private stagiaireService: StagiaireService,
	) {}

	ngOnInit(): void {
		this.route.params
			.subscribe((routeParams: Params) => {
				console.log('Route params: ', JSON.stringify(routeParams))
				const stagiaireId: number = routeParams['id'];
				console.log('Id was: ', stagiaireId);
				this.stagiaireService.findOne(stagiaireId)
					.subscribe((stagiaire: Stagiaire) => {
						this.stagiaire = stagiaire;
					})
			})
	}

	public onClose() {
		this.router.navigate(['/', 'home']);
	}
}
