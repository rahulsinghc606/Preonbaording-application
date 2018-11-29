import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PreonboardinBusinessGroupModule } from './business-group/business-group.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PreonboardinBusinessGroupModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreonboardinEntityModule {}
