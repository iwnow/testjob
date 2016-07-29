using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using server.Models;

namespace server.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EmployeeDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EmployeeDbContext context)
        {
            var positions = new List<Position>
            {
                new Position { Name = "Junior Developer"},
                new Position { Name = "Middle Developer"},
                new Position { Name = "Senior Developer"}
            };

            context.Positions.AddOrUpdate(p => p.Name, positions.ToArray());
            context.SaveChanges();

            context.Employees.Load();
            if (context.Employees.Any())
                return;
            // else create 3000 fake
            var fakeDevelopers = new List<Employee>();
            for (int i = 0, j = 0; i < 3000; i++,j++)
            {
                if (j == 2)
                    j = 0;
                fakeDevelopers.Add(new Employee
                {
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    PositionId = positions[j].Id,
                    Phone = string.Concat(_r.Next(18768, 88768), _r.Next(1, 887680)),
                    BirthDate = getRandomDate()
                });
            }
            context.Employees.AddRange(fakeDevelopers);
            context.SaveChanges();
        }

        private Random _r = new Random();
        private DateTime getRandomDate()
        {
            return new DateTime(_r.Next(1980, 2000), _r.Next(1, 12), _r.Next(1, 28));
        }
    }
}
