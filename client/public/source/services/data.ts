import {logger} from './logger';
import * as dto from '../dto';

export const dataService = {
    getDataGrid: getDataGrid,
    addEmployee: addEmployee,
    updEmployee: updEmployee,
    delEmployee: delEmployee
}

function getDataGrid<T>(numPage: number, perPage: number, search: string) {
    if (numPage < 1)
        numPage = 1;
    if (perPage < 1)
        perPage = 10;
    return new Promise<T>((res, rej) => {
        $.ajax(`/api/employee?page=${numPage}&perpage=${perPage}&search=${search}`, {
			success: function(r, status, hxr) {
				let _r = r as dto.DtoApiResponse<T>;
                if (_r.Error)
                    rej(_r.Error);
                res(_r.Data);
			}
		}).fail(err => rej(err));
    });
}

function addEmployee<T>(data) {
	return new Promise<T>((res, rej) => {
		$.ajax("/api/employee", {
			type: "POST",
			data: data,
			contentType : "application/json; charset=utf-8",
			dataType: 'json',
			success: function(r, status, hxr) {
				let _r = r as dto.DtoApiResponse<T>;
                if (_r.Error)
                    rej(_r.Error);
                res(_r.Data);
			}
		}).fail(err => rej(err));
	});
}
function updEmployee<T>(data) {
	return new Promise<T>((res, rej) => {
		$.ajax("/api/employee", {
			type: "PUT",
			data: data,
			contentType : "application/json; charset=utf-8",
			dataType: 'json',
			success: function(r, status, hxr) {
				let _r = r as dto.DtoApiResponse<T>;
                if (_r.Error)
                    rej(_r.Error);
                res(_r.Data);
			}
		}).fail(err => rej(err));
	});
}

function delEmployee<T>(data) {
	return new Promise<T>((res, rej) => {
		$.ajax("/api/employee", {
			type: "DELETE",
			data: data,
			contentType : "application/json; charset=utf-8",
			dataType: 'json',
			success: function(r, status, hxr) {
				let _r = r as dto.DtoApiResponse<T>;
                if (_r.Error)
                    rej(_r.Error);
                res(_r.Data);
			}
		}).fail(err => rej(err));
	});
}


// function delBook(data) {
// 	return new Promise<boolean>((res, rej) => {
// 		$.ajax("/r/Home/DelBook", {
// 			type: "POST",
// 			data: data,
// 			contentType : "application/json; charset=utf-8",
// 			dataType: 'json',
// 			success: function(r, status, hxr) {
// 				if (r && r.status == 200)
// 					res(r.result);
// 				rej(r.status);
// 			}
// 		}).fail(err => rej(err));
// 	});
// }

