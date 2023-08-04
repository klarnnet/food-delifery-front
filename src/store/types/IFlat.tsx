export interface IFlat {
    id:string,
    about: any;
    rooms: string;
    description: string;
    name:string;
    people: string;
    coast: string;
    type: string;
    adress: string;
    phone: string;
    metro: string;
    region: string;
    city: string;
}

export interface FilterFlatDto {
    rooms: number;
    people: number;
    coastmin: number;
    coastmax: number;
    type: string;
    metro: string;
    region: string;
    city: string;
  }