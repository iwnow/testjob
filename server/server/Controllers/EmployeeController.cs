using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Ninject;
using server.Contracts;
using server.DTO;

namespace server.Controllers
{

    public class EmployeeController : ApiController
    {
        private readonly IGridProvider<DtoGridData> _gridProvider;
        private readonly IRepositoryService _repo;

        public EmployeeController():this(
            IoC.AppKernel.Get<IGridProvider<DtoGridData>>(),
            IoC.AppKernel.Get<IRepositoryService>()
        ) { }

        public EmployeeController(IGridProvider<DtoGridData> provider, IRepositoryService repo)
        {
            this._gridProvider = provider;
            this._repo = repo;
        }

        [HttpGet]
        public async Task<DtoApiResponse<DtoGridData>> Get()
        {
            return await this.GetCreateResponse();
        }

        [HttpGet]
        public async Task<DtoApiResponse<DtoGridData>> Get(int page, int perpage)
        {
            return await this.GetCreateResponse(page, perpage);
        }

        [HttpGet]
        public async Task<DtoApiResponse<DtoGridData>> Get(int page, int perpage, string search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return await this.GetCreateResponse(page, perpage);
            try
            {
                var data = await this._gridProvider.GetDataAsync(this._repo, 
                    (e) => e.FirstName.Contains(search) || 
                    e.LastName.Contains(search) || 
                    e.Phone.Contains(search), 
                    page, perpage);
                return await Task.FromResult(new DtoApiResponse<DtoGridData>
                {
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new DtoApiResponse<DtoGridData>
                {
                    Data = null,
                    Error = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<DtoApiResponse<int>> Add(IEnumerable<DtoEmployee> e)
        {
            try
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = await this._repo.AddEmployeesAsync(e)
                });
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = -1,
                    Error = ex.Message
                });
            }
        }

        [HttpPut]
        public async Task<DtoApiResponse<int>> Update(IEnumerable<DtoEmployee> e)
        {
            try
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = await this._repo.UpdateEmployeesAsync(e)
                });
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = -1,
                    Error = ex.Message
                });
            }
        }

        [HttpDelete]
        public async Task<DtoApiResponse<int>> Delete(IEnumerable<DtoEmployee> e)
        {
            try
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = await this._repo.DeleteEmployeesAsync(e)
                });
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new DtoApiResponse<int>
                {
                    Data = -1,
                    Error = ex.Message
                });
            }
        }

        async Task<DtoApiResponse<DtoGridData>> GetCreateResponse(int page = 1, int perpage = 10)
        {
            try
            {
                var data = await this._gridProvider.GetDataAsync(page, perpage);
                return await Task.FromResult(new DtoApiResponse<DtoGridData>
                {
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return await Task.FromResult(new DtoApiResponse<DtoGridData>
                {
                    Data = null,
                    Error = ex.Message
                });
            }
        }
    }
}
