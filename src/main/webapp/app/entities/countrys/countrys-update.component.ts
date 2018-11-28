import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICountrys } from 'app/shared/model/countrys.model';
import { CountrysService } from './countrys.service';

@Component({
    selector: 'jhi-countrys-update',
    templateUrl: './countrys-update.component.html'
})
export class CountrysUpdateComponent implements OnInit {
    countrys: ICountrys;
    isSaving: boolean;

    constructor(private countrysService: CountrysService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ countrys }) => {
            this.countrys = countrys;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.countrys.id !== undefined) {
            this.subscribeToSaveResponse(this.countrysService.update(this.countrys));
        } else {
            this.subscribeToSaveResponse(this.countrysService.create(this.countrys));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICountrys>>) {
        result.subscribe((res: HttpResponse<ICountrys>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
