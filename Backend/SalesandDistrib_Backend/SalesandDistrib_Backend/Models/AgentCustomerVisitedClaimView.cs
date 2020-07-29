using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class AgentCustomerVisitedClaimView
    {
        public string ClaimType { get; set; }
        public int AgentOrderStatusId { get; set; }
        public string ClaimDate { get; set; }
    }
}
