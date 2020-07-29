using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class AgentJourneyPlanView
    {
        public List<string> customerNameList { get; set; }
        public string saleAgentName { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public int distId { get; set; }

        public int agentOrderStatusId { get; set; }

    }
}
