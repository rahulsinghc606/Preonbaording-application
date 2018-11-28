import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountrys } from 'app/shared/model/countrys.model';

@Component({
    selector: 'jhi-countrys-detail',
    templateUrl: './countrys-detail.component.html'
})
export class CountrysDetailComponent implements OnInit {
    countrys: ICountrys;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countrys }) => {
            this.countrys = countrys;
        });
    }

    previousState() {
        window.history.back();
    }
}
