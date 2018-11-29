/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PreonboardinTestModule } from '../../../test.module';
import { BusinessGroupDeleteDialogComponent } from 'app/entities/business-group/business-group-delete-dialog.component';
import { BusinessGroupService } from 'app/entities/business-group/business-group.service';

describe('Component Tests', () => {
    describe('BusinessGroup Management Delete Component', () => {
        let comp: BusinessGroupDeleteDialogComponent;
        let fixture: ComponentFixture<BusinessGroupDeleteDialogComponent>;
        let service: BusinessGroupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [BusinessGroupDeleteDialogComponent]
            })
                .overrideTemplate(BusinessGroupDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessGroupDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessGroupService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
