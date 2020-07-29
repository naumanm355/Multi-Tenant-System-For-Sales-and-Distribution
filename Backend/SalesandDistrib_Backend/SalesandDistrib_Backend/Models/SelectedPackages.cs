using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class SelectedPackages
    {
        [Key]
        public int Id { get; set; }
        public Users _distributor { get; set; }
        [ForeignKey("_distributor")]
        public int DistributorId { get; set; }
        public Packages _packages { get; set; }
        [ForeignKey("_packages")]
        public int PackageId { get; set; }
    }
}
