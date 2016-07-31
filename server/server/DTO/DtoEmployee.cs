using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.DTO
{
    public class DtoEmployee
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string BirthDate { get; set; }

        public string Phone { get; set; }

        public DtoPosition Position { get; set; }
    }
}