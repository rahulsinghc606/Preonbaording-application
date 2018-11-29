import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBusinessGroup } from 'app/shared/model/business-group.model';
import { Principal } from 'app/core';
import { BusinessGroupService } from './business-group.service';

@Component({
    selector: 'jhi-business-group',
    templateUrl: './business-group.component.html'
})
export class BusinessGroupComponent implements OnInit, OnDestroy {
    businessGroups: IBusinessGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private businessGroupService: BusinessGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.businessGroupService.query().subscribe(
            (res: HttpResponse<IBusinessGroup[]>) => {
                this.businessGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBusinessGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBusinessGroup) {
        return item.id;
    }

    registerChangeInBusinessGroups() {
        this.eventSubscriber = this.eventManager.subscribe('businessGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
