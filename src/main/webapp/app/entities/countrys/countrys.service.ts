import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountrys } from 'app/shared/model/countrys.model';

type EntityResponseType = HttpResponse<ICountrys>;
type EntityArrayResponseType = HttpResponse<ICountrys[]>;

@Injectable({ providedIn: 'root' })
export class CountrysService {
    public resourceUrl = SERVER_API_URL + 'api/countrys';

    constructor(private http: HttpClient) {}

    create(countrys: ICountrys): Observable<EntityResponseType> {
        return this.http.post<ICountrys>(this.resourceUrl, countrys, { observe: 'response' });
    }

    update(countrys: ICountrys): Observable<EntityResponseType> {
        return this.http.put<ICountrys>(this.resourceUrl, countrys, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICountrys>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountrys[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
