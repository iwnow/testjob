import {DtoEmployee} from './employee';

export class DtoGridPage {
    PageNum: number;
    Data: DtoEmployee[]; 
}

export class DtoGridData {
    CurrentPage: DtoGridPage;
    TotalPageCount: number;
    CountPerPage: number;
    Buffer: DtoGridPage[]; 
}