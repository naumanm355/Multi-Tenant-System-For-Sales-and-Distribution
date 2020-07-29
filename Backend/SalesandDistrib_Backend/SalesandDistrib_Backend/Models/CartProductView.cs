using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class CartProductView
    {[Key]
        public int Id { get; set; }
        public AgentOrderStatus agentOrderStatus { get; set; }
        [ForeignKey("_agentorderstatus")]
        public int AgentOrderStatusId { get; set; }
                public Inventory _inventory { get; set; }

        [ForeignKey("_inventory")]
        public int InventoryId { get; set; }
        public int QTY { get; set; }
        public string OrderDate { get; set; }

    }
}
