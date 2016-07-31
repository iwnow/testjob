using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using server.DTO;
using server.Models;
using server.Services;

namespace server.Contracts
{
    public interface IGridProvider<V> where V : class, new()
    {
        Task<V> GetDataAsync(int numPage = 1, int rowsPerPage = 10);
        Task<V> GetDataAsync(IRepositoryService repo, int numPage = 1, int rowsPerPage = 10);
        Task<V> GetDataAsync(IRepositoryService repo, Expression<Func<Employee, bool>> predicat, int numPage = 1, int rowsPerPage = 10);
    }
}
