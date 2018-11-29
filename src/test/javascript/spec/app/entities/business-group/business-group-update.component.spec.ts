/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PreonboardinTestModule } from '../../../test.module';
import { BusinessGroupUpdateComponent } from 'app/entities/business-group/business-group-update.component';
import { BusinessGroupService } from 'app/entities/business-group/business-group.service';
import { BusinessGroup } from 'app/shared/model/business-group.model';

describe('Component Tests', () => {
    describe('BusinessGroup Management Update Component', () => {
        let comp: BusinessGroupUpdateComponent;
        let fixture: ComponentFixture<BusinessGroupUpdateComponent>;
        let service: BusinessGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [BusinessGroupUpdateComponent]
            })
                .overrideTemplate(BusinessGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessGroupService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessGroup(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessGroup();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.businessGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
