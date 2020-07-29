using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class AgentCustomer
    {
        [Key]
        public int Id { get; set; }
        public Users saleagentObject { get; set; }
       [ForeignKey("saleagentObject")]
        public int SaleAgentId { get; set; }
        public Users customerObject { get; set; }
          [ForeignKey("customerObject")]
        public int CustomerId { get; set; }
    }
}
