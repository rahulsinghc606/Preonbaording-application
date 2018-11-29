export interface IBusinessGroup {
    id?: number;
    businessGroupId?: number;
    businessGroup?: string;
    businessGroupHead?: string;
}

export class BusinessGroup implements IBusinessGroup {
    constructor(public id?: number, public businessGroupId?: number, public businessGroup?: string, public businessGroupHead?: string) {}
}
