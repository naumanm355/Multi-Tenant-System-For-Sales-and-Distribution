using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        public Products _products { get; set; }
        [ForeignKey("_products")]
        public int ProductId { get; set; }
        public int TotalPacket_Cartoon { get; set; }
        public int Price { get; set; }


    }
}
