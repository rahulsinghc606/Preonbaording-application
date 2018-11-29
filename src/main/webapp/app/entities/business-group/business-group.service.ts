import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBusinessGroup } from 'app/shared/model/business-group.model';

type EntityResponseType = HttpResponse<IBusinessGroup>;
type EntityArrayResponseType = HttpResponse<IBusinessGroup[]>;

@Injectable({ providedIn: 'root' })
export class BusinessGroupService {
    public resourceUrl = SERVER_API_URL + 'api/business-groups';

    constructor(private http: HttpClient) {}

    create(businessGroup: IBusinessGroup): Observable<EntityResponseType> {
        return this.http.post<IBusinessGroup>(this.resourceUrl, businessGroup, { observe: 'response' });
    }

    update(businessGroup: IBusinessGroup): Observable<EntityResponseType> {
        return this.http.put<IBusinessGroup>(this.resourceUrl, businessGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBusinessGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBusinessGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
