using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class AgentOrderStatus
    {
        [Key]
        public int Id { get; set; }
        
        public OrderStatusType _orderstatustype { get; set; }
        [ForeignKey("_orderstatustype")]
        public int OrderStatusId { get; set; }

        public TargetStatusType _targetStatusType { get; set; }
        [ForeignKey("_targetStatusType")]
        public int AgentTargetStatusId { get; set; }


        public AgentCustomer _agentcustomer { get; set; }
        [ForeignKey("_agentcustomer")]
        public int AgentCustomerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
