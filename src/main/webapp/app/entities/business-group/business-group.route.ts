import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BusinessGroup } from 'app/shared/model/business-group.model';
import { BusinessGroupService } from './business-group.service';
import { BusinessGroupComponent } from './business-group.component';
import { BusinessGroupDetailComponent } from './business-group-detail.component';
import { BusinessGroupUpdateComponent } from './business-group-update.component';
import { BusinessGroupDeletePopupComponent } from './business-group-delete-dialog.component';
import { IBusinessGroup } from 'app/shared/model/business-group.model';

@Injectable({ providedIn: 'root' })
export class BusinessGroupResolve implements Resolve<IBusinessGroup> {
    constructor(private service: BusinessGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BusinessGroup> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BusinessGroup>) => response.ok),
                map((businessGroup: HttpResponse<BusinessGroup>) => businessGroup.body)
            );
        }
        return of(new BusinessGroup());
    }
}

export const businessGroupRoute: Routes = [
    {
        path: 'business-group',
        component: BusinessGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusinessGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-group/:id/view',
        component: BusinessGroupDetailComponent,
        resolve: {
            businessGroup: BusinessGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusinessGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-group/new',
        component: BusinessGroupUpdateComponent,
        resolve: {
            businessGroup: BusinessGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusinessGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-group/:id/edit',
        component: BusinessGroupUpdateComponent,
        resolve: {
            businessGroup: BusinessGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusinessGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const businessGroupPopupRoute: Routes = [
    {
        path: 'business-group/:id/delete',
        component: BusinessGroupDeletePopupComponent,
        resolve: {
            businessGroup: BusinessGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusinessGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
