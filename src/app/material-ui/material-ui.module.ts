import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import des forms ui
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	exports: [
		...MaterialUiModule.materialModules
	]
})
export class MaterialUiModule {
	public static materialModules = [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatDatepickerModule,
		MatSlideToggleModule
	]
}
