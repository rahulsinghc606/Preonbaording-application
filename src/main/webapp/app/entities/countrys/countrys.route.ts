import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Countrys } from 'app/shared/model/countrys.model';
import { CountrysService } from './countrys.service';
import { CountrysComponent } from './countrys.component';
import { CountrysDetailComponent } from './countrys-detail.component';
import { CountrysUpdateComponent } from './countrys-update.component';
import { CountrysDeletePopupComponent } from './countrys-delete-dialog.component';
import { ICountrys } from 'app/shared/model/countrys.model';

@Injectable({ providedIn: 'root' })
export class CountrysResolve implements Resolve<ICountrys> {
    constructor(private service: CountrysService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Countrys> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Countrys>) => response.ok),
                map((countrys: HttpResponse<Countrys>) => countrys.body)
            );
        }
        return of(new Countrys());
    }
}

export const countrysRoute: Routes = [
    {
        path: 'countrys',
        component: CountrysComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countrys'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countrys/:id/view',
        component: CountrysDetailComponent,
        resolve: {
            countrys: CountrysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countrys'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countrys/new',
        component: CountrysUpdateComponent,
        resolve: {
            countrys: CountrysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countrys'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'countrys/:id/edit',
        component: CountrysUpdateComponent,
        resolve: {
            countrys: CountrysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countrys'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countrysPopupRoute: Routes = [
    {
        path: 'countrys/:id/delete',
        component: CountrysDeletePopupComponent,
        resolve: {
            countrys: CountrysResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Countrys'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
