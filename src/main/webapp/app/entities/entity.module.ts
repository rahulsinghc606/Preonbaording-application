import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PreonboardinRegionModule } from './region/region.module';
import { PreonboardinCountryModule } from './country/country.module';
import { PreonboardinCountrysModule } from './countrys/countrys.module';
import { PreonboardinLocationModule } from './location/location.module';
import { PreonboardinDepartmentModule } from './department/department.module';
import { PreonboardinTaskModule } from './task/task.module';
import { PreonboardinEmployeeModule } from './employee/employee.module';
import { PreonboardinJobModule } from './job/job.module';
import { PreonboardinJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PreonboardinRegionModule,
        PreonboardinCountryModule,
        PreonboardinCountrysModule,
        PreonboardinLocationModule,
        PreonboardinDepartmentModule,
        PreonboardinTaskModule,
        PreonboardinEmployeeModule,
        PreonboardinJobModule,
        PreonboardinJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PreonboardinEntityModule {}
