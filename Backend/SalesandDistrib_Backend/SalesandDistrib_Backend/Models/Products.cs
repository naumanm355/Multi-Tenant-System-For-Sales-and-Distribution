using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        public Users _distributorId { get; set; }
        [ForeignKey("_distributorId")]
        public int DistributorId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Category { get; set; }

        public string Company { get; set; }
        public int PrimaryUnit { get; set; }
        public int SecondaryUnit { get; set; }
        //    public bool isReturnable { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string imageUrl { get; set; }
    }
}
