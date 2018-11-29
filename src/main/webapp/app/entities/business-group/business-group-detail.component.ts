import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessGroup } from 'app/shared/model/business-group.model';

@Component({
    selector: 'jhi-business-group-detail',
    templateUrl: './business-group-detail.component.html'
})
export class BusinessGroupDetailComponent implements OnInit {
    businessGroup: IBusinessGroup;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessGroup }) => {
            this.businessGroup = businessGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
