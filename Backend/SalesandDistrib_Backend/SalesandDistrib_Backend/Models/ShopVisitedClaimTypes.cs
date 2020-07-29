using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class ShopVisitedClaimTypes
    {
        [Key]
        public int Id { get; set; }
        public string ClaimType { get; set; }
    }
}
