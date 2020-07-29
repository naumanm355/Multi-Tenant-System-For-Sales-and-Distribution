using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class UpdateOutstandingBalance_View
    {
        //public int AgentCustomerId { get; set; }
        public List<CustomerOrderPayment> orderPaymentList { get; set; }
    }
}
