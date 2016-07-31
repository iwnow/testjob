using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using Ninject;
using server.Contracts;
using server.DTO;
using server.Models;

namespace server.Services
{
    public class GridProvider : IGridProvider<DtoGridData>
    {
        public IRepositoryService _repo;

        public GridProvider():this(IoC.AppKernel.Get<IRepositoryService>()) { }
        public GridProvider(IRepositoryService repo)
        {
            this._repo = repo;
        }

        public async Task<DtoGridData> GetDataAsync(int numPage = 1, int rowsPerPage = 10)
        {
            return await this.GetDataAsync(this._repo, numPage, rowsPerPage);
        }

        public async Task<DtoGridData> GetDataAsync(IRepositoryService repo, int numPage = 1, int rowsPerPage = 10)
        {
            if (numPage < 1)
                numPage = 1;
            if (rowsPerPage < 1)
                rowsPerPage = 10;
            var res = new DtoGridData
            {
                CountPerPage = rowsPerPage
            };
            var c = await repo.CountEmployees();
            res.TotalPageCount = c%rowsPerPage == 0 ? c/rowsPerPage : (c/rowsPerPage) + 1;
            res.CurrentPage = new DtoGridPage
            {
                PageNum = numPage,
                Data = await repo.GetEmployeesAsync((numPage - 1)*rowsPerPage, rowsPerPage)
            };
            res.Buffer = new List<DtoGridPage>();
            return await Task.FromResult(res);
        }

        public async Task<DtoGridData> GetDataAsync(IRepositoryService repo, Expression<Func<Employee, bool>> predicat, int numPage = 1, int rowsPerPage = 10)
        {
            if (numPage < 1)
                numPage = 1;
            if (rowsPerPage < 1)
                rowsPerPage = 10;
            var res = new DtoGridData
            {
                CountPerPage = rowsPerPage
            };
            var c = await repo.CountEmployees(predicat);
            res.TotalPageCount = c % rowsPerPage == 0 ? c / rowsPerPage : (c / rowsPerPage) + 1;
            res.CurrentPage = new DtoGridPage
            {
                PageNum = numPage,
                Data = await repo.GetEmployeesAsync(predicat, (numPage - 1) * rowsPerPage, rowsPerPage)
            };
            res.Buffer = new List<DtoGridPage>();
            return await Task.FromResult(res);
        }
    }
}