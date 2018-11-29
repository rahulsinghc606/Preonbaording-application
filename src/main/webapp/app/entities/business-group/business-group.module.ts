import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PreonboardinSharedModule } from 'app/shared';
import {
    BusinessGroupComponent,
    BusinessGroupDetailComponent,
    BusinessGroupUpdateComponent,
    BusinessGroupDeletePopupComponent,
    BusinessGroupDeleteDialogComponent,
    businessGroupRoute,
    businessGroupPopupRoute
} from './';

const ENTITY_STATES = [...businessGroupRoute, ...businessGroupPopupRoute];

@NgModule({
    imports: [PreonboardinSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BusinessGroupComponent,
        BusinessGroupDetailComponent,
        BusinessGroupUpdateComponent,
        BusinessGroupDeleteDialogComponent,
        BusinessGroupDeletePopupComponent
    ],
    entryComponents: [
        BusinessGroupComponent,
        BusinessGroupUpdateComponent,
        BusinessGroupDeleteDialogComponent,
        BusinessGroupDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreonboardinBusinessGroupModule {}
