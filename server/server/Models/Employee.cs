using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(60)]
        public string FirstName { get; set; }

        [MaxLength(60)]
        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        [MaxLength(15)]
        public string Phone { get; set; }

        //references
        public int? PositionId { get; set; }
        public Position Position { get; set; }
    }
}