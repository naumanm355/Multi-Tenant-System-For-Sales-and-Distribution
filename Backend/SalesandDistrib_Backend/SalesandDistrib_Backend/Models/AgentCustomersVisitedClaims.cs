using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class AgentCustomersVisitedClaims
    {
        
        public AgentOrderStatus agentOrderStatus { get; set; }
        [Key]
        [ForeignKey("agentOrderStatus")]
        public int AgentOrderStatusId { get; set; }
        public ShopVisitedClaimTypes shopVisitedClaimTypes { get; set; }
        [ForeignKey("shopVisitedClaimTypes")]
        public int VisitedClaimTypeId { get; set; }
        public string ClaimDate { get; set; }
    }
}
