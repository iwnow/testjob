using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using server.Contracts;
using server.DTO;
using server.Models;

namespace server.Services
{
    public class RepositoryService : IRepositoryService
    {
        public IEnumerable<DtoEmployee> GetEmployees()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<DtoEmployee>> GetEmployeesAsync()
        {
            using (var db = new EmployeeDbContext())
            {
                var es = await db.Employees
                    .Include(e => e.Position)
                    .OrderBy(e => e.Id).ToListAsync();
                return await Task.FromResult(es.Select(e => e.AsDto()).ToList());
            }
        }

        public async Task<IEnumerable<DtoEmployee>> GetEmployeesAsync(int skip, int take)
        {
            using (var db = new EmployeeDbContext())
            {
                var es = await db.Employees.Include(e => e.Position).OrderBy(e => e.Id).Skip(skip).Take(take).ToListAsync();
                return await Task.FromResult(es.Select(e => e.AsDto()).ToList());
            }
        }

        public async Task<IEnumerable<DtoEmployee>> GetEmployeesAsync(Expression<Func<Employee, bool>> predicat,int skip, int take)
        {
            using (var db = new EmployeeDbContext())
            {
                var es = await db.Employees.Include(e => e.Position).Where(predicat)
                    .OrderBy(e => e.Id).Skip(skip).Take(take).ToListAsync();
                return await Task.FromResult(es.Select(e => e.AsDto()).ToList());
            }
        }

        public async Task<int> CountEmployees()
        {
            using (var db = new EmployeeDbContext())
            {
                return await db.Employees.CountAsync();
            }
        }

        public async Task<int> CountEmployees(Expression<Func<Employee, bool>> predicat)
        {
            using (var db = new EmployeeDbContext())
            {
                return await db.Employees.CountAsync(predicat);
            }
        }

        public DtoEmployee GetEmployee(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DtoEmployee> GetEmployeeAsync(int id)
        {
            throw new NotImplementedException();
        }

        public int AddEmployees(IEnumerable<DtoEmployee> employees)
        {
            throw new NotImplementedException();
        }

        public async Task<int> AddEmployeesAsync(IEnumerable<DtoEmployee> employees)
        {
            using (var db = new EmployeeDbContext())
            {
                db.Employees.AddRange(MapDtoEmployees(employees));
                return await db.SaveChangesAsync();
            }
        }

        IEnumerable<Employee> MapDtoEmployees(IEnumerable<DtoEmployee> ee)
        {
            return ee.Select(e =>
            {
                var posId = e.Position?.Id ?? 1;
                return new Employee
                {
                    Id = e.Id,
                    PositionId = posId,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Phone = e.Phone,
                    BirthDate = e.BirthDate == null ? DateTime.Now :
                        DateTime.ParseExact(e.BirthDate, "dd.MM.yyyy",
                            System.Globalization.CultureInfo.InvariantCulture)
                };
            }).ToList();
        } 

        public int UpdateEmployees(IEnumerable<DtoEmployee> employees)
        {
            throw new NotImplementedException();
        }

        public async Task<int> UpdateEmployeesAsync(IEnumerable<DtoEmployee> employees)
        {
            using (var db = new EmployeeDbContext())
            {
                var ids = employees.Select(e => e.Id).ToList();
                var ee = await db.Employees.Where(e => ids.Any(l => l == e.Id)).ToListAsync();
                ee.ForEach(i =>
                {
                    var n = employees.FirstOrDefault(l => l.Id == i.Id);
                    i.BirthDate = n.BirthDate == null ? DateTime.Now : DateTime.ParseExact(n.BirthDate, "dd.MM.yyyy",
                        System.Globalization.CultureInfo.InvariantCulture);
                    i.FirstName = n.FirstName;
                    i.LastName = n.LastName;
                    i.Phone = n.Phone;
                    i.PositionId = n.Position.Id;
                    db.Entry<Employee>(i).State = EntityState.Modified;
                });
                return await db.SaveChangesAsync();
            }
        }

        public int DeleteEmployees(IEnumerable<DtoEmployee> employees)
        {
            throw new NotImplementedException();
        }

        public async Task<int> DeleteEmployeesAsync(IEnumerable<DtoEmployee> employees)
        {
            using (var db = new EmployeeDbContext())
            {
                var ids = employees.Select(e => e.Id).ToList();
                var ee = await db.Employees.Where(e => ids.Any(l => l == e.Id)).ToListAsync();
                db.Employees.RemoveRange(ee);
                return await db.SaveChangesAsync();
            }
        }
    }
}