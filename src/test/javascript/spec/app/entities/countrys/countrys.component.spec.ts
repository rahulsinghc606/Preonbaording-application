/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PreonboardinTestModule } from '../../../test.module';
import { CountrysComponent } from 'app/entities/countrys/countrys.component';
import { CountrysService } from 'app/entities/countrys/countrys.service';
import { Countrys } from 'app/shared/model/countrys.model';

describe('Component Tests', () => {
    describe('Countrys Management Component', () => {
        let comp: CountrysComponent;
        let fixture: ComponentFixture<CountrysComponent>;
        let service: CountrysService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [CountrysComponent],
                providers: []
            })
                .overrideTemplate(CountrysComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountrysComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountrysService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Countrys(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.countrys[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
