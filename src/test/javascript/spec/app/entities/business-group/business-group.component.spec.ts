/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PreonboardinTestModule } from '../../../test.module';
import { BusinessGroupComponent } from 'app/entities/business-group/business-group.component';
import { BusinessGroupService } from 'app/entities/business-group/business-group.service';
import { BusinessGroup } from 'app/shared/model/business-group.model';

describe('Component Tests', () => {
    describe('BusinessGroup Management Component', () => {
        let comp: BusinessGroupComponent;
        let fixture: ComponentFixture<BusinessGroupComponent>;
        let service: BusinessGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [BusinessGroupComponent],
                providers: []
            })
                .overrideTemplate(BusinessGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BusinessGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.businessGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
