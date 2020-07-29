using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class ProductInventoryView
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public int TotalCarton { get; set; }
        public int PriceperCarton { get; set; }
        public int DistId { get; set; }

    }
}
