import { NgModule } from '@angular/core';

import { PreonboardinSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PreonboardinSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PreonboardinSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PreonboardinSharedCommonModule {}
