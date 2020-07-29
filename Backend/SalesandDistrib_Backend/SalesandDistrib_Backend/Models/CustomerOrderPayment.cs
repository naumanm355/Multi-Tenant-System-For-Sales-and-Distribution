using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class CustomerOrderPayment
    {
  
        [Key]
        [ForeignKey("_AgentOrderStatus")]
        public int AgentOrderStatusId { get; set; }
        public AgentOrderStatus _AgentOrderStatus { get; set; }
        public int AmountPaid { get; set; }

       
    }
}
