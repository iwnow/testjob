using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using server.Services;

namespace server.Models
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(): base(ConfigService.Get("dbconnection")) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Position> Positions { get; set; }
    }
}