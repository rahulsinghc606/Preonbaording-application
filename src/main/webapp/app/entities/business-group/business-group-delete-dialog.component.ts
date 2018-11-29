import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessGroup } from 'app/shared/model/business-group.model';
import { BusinessGroupService } from './business-group.service';

@Component({
    selector: 'jhi-business-group-delete-dialog',
    templateUrl: './business-group-delete-dialog.component.html'
})
export class BusinessGroupDeleteDialogComponent {
    businessGroup: IBusinessGroup;

    constructor(
        private businessGroupService: BusinessGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.businessGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'businessGroupListModification',
                content: 'Deleted an businessGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-business-group-delete-popup',
    template: ''
})
export class BusinessGroupDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ businessGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BusinessGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.businessGroup = businessGroup;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
