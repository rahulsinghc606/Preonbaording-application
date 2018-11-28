import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PreonboardinSharedModule } from 'app/shared';
import {
    CountrysComponent,
    CountrysDetailComponent,
    CountrysUpdateComponent,
    CountrysDeletePopupComponent,
    CountrysDeleteDialogComponent,
    countrysRoute,
    countrysPopupRoute
} from './';

const ENTITY_STATES = [...countrysRoute, ...countrysPopupRoute];

@NgModule({
    imports: [PreonboardinSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountrysComponent,
        CountrysDetailComponent,
        CountrysUpdateComponent,
        CountrysDeleteDialogComponent,
        CountrysDeletePopupComponent
    ],
    entryComponents: [CountrysComponent, CountrysUpdateComponent, CountrysDeleteDialogComponent, CountrysDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreonboardinCountrysModule {}
