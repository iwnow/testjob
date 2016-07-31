using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using server.DTO;

namespace server.Models
{
    [Table("Positions")]
    public class Position
    {
        [Key]
        public int Id { get; set; }

        [Index("PositionIndex", IsUnique = true)]
        [MaxLength(128)]
        public string Name { get; set; }

        //references
        public ICollection<Employee> Employees { get; set; }

        public DtoPosition AsDto()
        {
            return new DtoPosition
            {
                Id = this.Id,
                Name = this.Name
            };
        }
    }
}