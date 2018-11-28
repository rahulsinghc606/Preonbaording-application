/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PreonboardinTestModule } from '../../../test.module';
import { CountrysDetailComponent } from 'app/entities/countrys/countrys-detail.component';
import { Countrys } from 'app/shared/model/countrys.model';

describe('Component Tests', () => {
    describe('Countrys Management Detail Component', () => {
        let comp: CountrysDetailComponent;
        let fixture: ComponentFixture<CountrysDetailComponent>;
        const route = ({ data: of({ countrys: new Countrys(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [CountrysDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CountrysDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CountrysDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.countrys).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
