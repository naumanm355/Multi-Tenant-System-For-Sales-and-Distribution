using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class SelectedPrivileges
    {
        [Key]
        public int Id { get; set; }
        public Users _distributor { get; set; }
        public Roles _role { get; set; }
        public Privileges _privilge { get; set; }
        [ForeignKey("_distributor")]
        public int DistributorId { get; set; }
        [ForeignKey("_role")]
        public int RoleId { get; set; }
       [ForeignKey("_privilge")]
        public int PrivilgeId { get; set; }
    }
}
