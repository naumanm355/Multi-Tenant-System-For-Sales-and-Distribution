using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<SelectedPackages> DistributorPackages { get; set; }
        public DbSet<Privileges> Privileges { get; set; }
        public DbSet<SelectedPrivileges> RolePrivileges { get; set; }
        public DbSet<DistributorAgents> DistributorAgents { get; set; }
        public DbSet<Store> Store { get; set; }
        public DbSet<DistributorInfo> DistributorDetail { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }
        
        public DbSet<AgentOrderStatus> AgentOrderStatus { get; set; }
        public DbSet<OrderStatusType> OrderStatusType { get; set; }
        public DbSet<TargetStatusType> TargetStatusType { get; set; }
        public DbSet<AgentCustomer> AgentCustomer { get; set; }
       public DbSet<CustomerOrderPayment> CustomerOrderPayment { get; set; }
       public DbSet<ShopVisitedClaimTypes> ShopVisitedClaimTypes { get; set; }
        public DbSet<AgentCustomersVisitedClaims> AgentCustomersVisitedClaims { get; set; }


    }
}
