using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class DistributorInfo
    {
        [Key]
        public int Id { get; set; }
        public Users _distributor { get; set; }
        [ForeignKey("_distributor")]
        public int DistributorId { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
    }
}
