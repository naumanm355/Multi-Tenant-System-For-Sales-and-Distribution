using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class RolePrivilegesView
    {
        public string RoleName { get; set; }
        public int distId { get; set; }
        public List<string> selectedPrivileges { get; set; }
        public List<int>  rolePrivilegeId { get; set; }  //role privilege Id's in update of roleOPrivilege
    }
}
