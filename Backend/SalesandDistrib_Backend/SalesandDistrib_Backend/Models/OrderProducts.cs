using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class OrderProducts
    {
        [Key]
        public int Id { get; set; }
       

       
        public Inventory _inventory { get; set; }

        [ForeignKey("_inventory")]
        public int InventoryId { get; set; }
        public AgentOrderStatus _agentorderstatus { get; set; }
        [ForeignKey("_agentorderstatus")]
        public int AgentOrderStatusId { get; set; }
             public int QTY { get; set; }
      //  [JsonConvert.SerializeObject(DateTime.Now)]
       public DateTime OrderDate { get; set; }
       
       

    } 
}
