/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PreonboardinTestModule } from '../../../test.module';
import { BusinessGroupDetailComponent } from 'app/entities/business-group/business-group-detail.component';
import { BusinessGroup } from 'app/shared/model/business-group.model';

describe('Component Tests', () => {
    describe('BusinessGroup Management Detail Component', () => {
        let comp: BusinessGroupDetailComponent;
        let fixture: ComponentFixture<BusinessGroupDetailComponent>;
        const route = ({ data: of({ businessGroup: new BusinessGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [BusinessGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BusinessGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.businessGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
