export interface ICountrys {
    id?: number;
    countryName?: string;
}

export class Countrys implements ICountrys {
    constructor(public id?: number, public countryName?: string) {}
}
