using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        public Users _user { get; set; }
       [ForeignKey("_user")]
        public int UserId { get; set; }
        public  string Name { get; set; }

    }
}
