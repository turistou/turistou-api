import { Gender } from './Gender';

export enum Roles {
  TI = 'TI',
  Backoffice = 'BACKOFFICE',
  TouristGuide = 'TOURIST_GUIDE',
  TouristAgent = 'TOURIST_AGENT',
}

export interface IUser {
  email: String;
  name: String;
  lastName: String;
  phone: String;
  cpf: String;
  gender: Gender;
  birthDate: Date;
  roles: Roles[];
  active: Boolean;
}

export default class User implements IUser {
  email: String;
  name: String;
  lastName: String;
  phone: String;
  cpf: String;
  gender: Gender;
  birthDate: Date;
  roles: Roles[];
  active: Boolean;

  public toString(): string {
    return `${this.name} ${this.lastName} (${this.email})`;
  }
}
