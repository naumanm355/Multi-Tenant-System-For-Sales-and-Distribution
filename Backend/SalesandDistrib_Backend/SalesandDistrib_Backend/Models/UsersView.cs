using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class UsersView
    {
        public string FirstName { get; set; }  //distributor and other role (customer and agent)
        public string LastName { get; set; }   //distributor and other role (customer and agent)
        public string Email { get; set; }   //distributor and other role (customer and agent)
        public string Contact { get; set; }    //distributor and other role (customer and agent)
        public string Address { get; set; }    //distributor and other role (customer and agent)
                                               //  public string Password { get; set; }
        public string StoreName { get; set; }    //distributor 
        public string City { get; set; }    //distributor 
        public string Province { get; set; }    //distributor
        public int PostalCode { get; set; }    //distributor
        public string Country { get; set; }    //distributor 
        public string RoleName { get; set; }  // other role (customer and agent)
        public int DistId { get; set; }   // other role (customer and agent)
        public int UserId { get; set; }   //edit or delete other role (customer and agent)
        public string Password { get; set; }  //edit other role (customer and agent)
        public int RoleId { get; set; } //edit other role (customer and agent)
    }
}
