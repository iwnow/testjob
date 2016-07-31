using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using server.DTO;
using server.Models;

namespace server.Contracts
{
    public interface IRepositoryService
    {
        IEnumerable<DtoEmployee> GetEmployees();
        Task<IEnumerable<DtoEmployee>> GetEmployeesAsync();
        Task<IEnumerable<DtoEmployee>> GetEmployeesAsync(int skip, int take);
        Task<IEnumerable<DtoEmployee>> GetEmployeesAsync(Expression<Func<Employee, bool>> predicat, int skip, int take);
        Task<int> CountEmployees();
        Task<int> CountEmployees(Expression<Func<Employee, bool>> predicat);

        DtoEmployee GetEmployee(int id);
        Task<DtoEmployee> GetEmployeeAsync(int id);

        int AddEmployees(IEnumerable<DtoEmployee> employees);
        Task<int> AddEmployeesAsync(IEnumerable<DtoEmployee> employees);

        int UpdateEmployees(IEnumerable<DtoEmployee> employees);
        Task<int> UpdateEmployeesAsync(IEnumerable<DtoEmployee> employees);

        int DeleteEmployees(IEnumerable<DtoEmployee> employees);
        Task<int> DeleteEmployeesAsync(IEnumerable<DtoEmployee> employees);
    }
}
