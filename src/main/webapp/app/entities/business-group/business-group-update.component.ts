import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBusinessGroup } from 'app/shared/model/business-group.model';
import { BusinessGroupService } from './business-group.service';

@Component({
    selector: 'jhi-business-group-update',
    templateUrl: './business-group-update.component.html'
})
export class BusinessGroupUpdateComponent implements OnInit {
    businessGroup: IBusinessGroup;
    isSaving: boolean;

    constructor(private businessGroupService: BusinessGroupService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ businessGroup }) => {
            this.businessGroup = businessGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.businessGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.businessGroupService.update(this.businessGroup));
        } else {
            this.subscribeToSaveResponse(this.businessGroupService.create(this.businessGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessGroup>>) {
        result.subscribe((res: HttpResponse<IBusinessGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
