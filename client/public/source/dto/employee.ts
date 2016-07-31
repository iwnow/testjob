import {DtoPosition} from './position';
export class DtoEmployee {
	Id: number;
    FirstName: string;
    LastName: string;
    BirthDate: string;
    Phone: string;
    Position: DtoPosition;
}