/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PreonboardinTestModule } from '../../../test.module';
import { CountrysUpdateComponent } from 'app/entities/countrys/countrys-update.component';
import { CountrysService } from 'app/entities/countrys/countrys.service';
import { Countrys } from 'app/shared/model/countrys.model';

describe('Component Tests', () => {
    describe('Countrys Management Update Component', () => {
        let comp: CountrysUpdateComponent;
        let fixture: ComponentFixture<CountrysUpdateComponent>;
        let service: CountrysService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PreonboardinTestModule],
                declarations: [CountrysUpdateComponent]
            })
                .overrideTemplate(CountrysUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CountrysUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountrysService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Countrys(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countrys = entity;
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
                    const entity = new Countrys();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.countrys = entity;
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
