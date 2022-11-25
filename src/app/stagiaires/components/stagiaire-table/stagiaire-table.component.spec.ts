import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';

import { StagiaireTableComponent } from './stagiaire-table.component';
import { StagiaireFilterComponent } from '../stagiaire-filter/stagiaire-filter.component';

describe('StagiaireTableComponent', () => {
  let component: StagiaireTableComponent;
  let fixture: ComponentFixture<StagiaireTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StagiaireTableComponent,
        InitialsPipe,
        StagiaireFilterComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagiaireTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
