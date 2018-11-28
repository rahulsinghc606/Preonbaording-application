import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICountrys } from 'app/shared/model/countrys.model';
import { CountrysService } from './countrys.service';

@Component({
    selector: 'jhi-countrys-delete-dialog',
    templateUrl: './countrys-delete-dialog.component.html'
})
export class CountrysDeleteDialogComponent {
    countrys: ICountrys;

    constructor(private countrysService: CountrysService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countrysService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'countrysListModification',
                content: 'Deleted an countrys'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-countrys-delete-popup',
    template: ''
})
export class CountrysDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ countrys }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CountrysDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.countrys = countrys;
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
