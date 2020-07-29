using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesandDistrib_Backend.Models;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]
  //  [EnableCors("AllowMyOrigin")]
    [ApiController]
    public class AgentCustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AgentCustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/AgentCustomers
        [HttpGet]        public async Task<ActionResult<IEnumerable<AgentCustomer>>> GetAgentCustomer()
        {
            return await _context.AgentCustomer.ToListAsync();
        }

        // GET: api/AgentCustomers/5
        [HttpGet("{id}")]  //get all agent and customer of a distributor
        public async Task<ActionResult<AgentCustomer>> GetAgentCustomer(int id)
        {
            var agentCustomer = (from u in _context.Users
                                 join dist in _context.DistributorAgents on u.Id equals dist.UserId
                                 join uRole in _context.UserRoles on u.Id equals uRole.UserId
                                 join role in _context.Roles on uRole.RoleId equals role.Id
                                 where dist.DistributorId == id
                                 select new
                                 {
                                     userInfo = u,
                                     roleName = role.Name
                                 }).ToList();
            return Ok(new { DistributorUsersStatus = "GetSuccess", distributorUsersList = agentCustomer });
        }

        // PUT: api/AgentCustomers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgentCustomer(int id, AgentCustomer agentCustomer)
        {
            if (id != agentCustomer.Id)
            {
                return BadRequest();
            }

            _context.Entry(agentCustomer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentCustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AgentCustomers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
//              [HttpPost]
//        [Route("CreateAgentJourneyPlan")]
//        public async Task<ActionResult<AgentCustomer>> PostAgentJourneyPlan(AgentJourneyPlanView agentJourneyPlanView)
//        {

//            List<int> customerIdList = new List<int>();
//            int agentId = _context.Users.Where(obj => obj.FirstName + ' ' + obj.LastName == agentJourneyPlanView.saleAgentName).FirstOrDefault().Id;

//            //    string status = "";
//            for (int i = 0; i < agentJourneyPlanView.customerNameList.Count; i++)
//            {
//                AgentOrderStatus agentOrderStatus = new AgentOrderStatus();
//                agentOrderStatus.AgentCustomerId = getAgentCustomerId(agentJourneyPlanView.customerNameList[i], agentId);
//                agentOrderStatus.StartDate = System.DateTime.Parse(agentJourneyPlanView.startDate);
//                agentOrderStatus.EndDate = System.DateTime.Parse(agentJourneyPlanView.endDate);
//                agentOrderStatus.AgentTargetStatusId = 1;
//                agentOrderStatus.OrderStatusId = 1;
//                _context.AgentOrderStatus.Add(agentOrderStatus);
//                await _context.SaveChangesAsync();

//            }
//            var data = (from user in _context.Users
//                        join userrole in _context.UserRoles on user.Id equals userrole.UserId
//                        join role in _context.Roles on
//userrole.RoleId equals role.Id
//                        where role.Name == "sale agent"
//                        join distagent in _context.DistributorAgents on user.Id equals distagent.UserId
//                        where distagent.DistributorId == agentJourneyPlanView.distId
//                        join agentcus in _context.AgentCustomer on user.Id equals agentcus.SaleAgentId
//                        join
//agentordstat in _context.AgentOrderStatus on agentcus.Id equals agentordstat.AgentCustomerId
//                        join tartype in _context.TargetStatusType on
//agentordstat.AgentTargetStatusId equals tartype.Id
//                        join ordertype in _context.OrderStatusType on agentordstat.OrderStatusId equals ordertype.Id
//                        //join
//                        //orderprod in _context.OrderProducts on agentordstat.Id equals orderprod.AgentOrderStatusId join invent in _context.Inventory on
//                        // orderprod.InventoryId equals invent.Id join Prod in _context.Products on invent.ProductId equals Prod.Id
//                        select new
//                        {
//                            agentObject = user,
//                            CustomerName = (from customer in _context.Users where customer.Id == agentcus.CustomerId select new { customerObject = customer }).FirstOrDefault(),
//                            TargetType = tartype.Type,
//                            OrderType = ordertype.OrderStatus
//                        }
//                     ).ToList();
//            //    status = "success";
//            return Ok(new { AgentJourneyPlanStatus = "SaveSuccess", distributorUsersList = data });

//            //   return Ok(new { AgentJourneyPlanStatus = status });

//        }

        [HttpPost]
        [Route("GetDistAgentwithCustomer")]
        public async Task<ActionResult<AgentCustomer>> getdistributorAgentwithCustomer(DistributorAgents distributorAgents)
        {

            var data = (from user in _context.Users
                        join userrole in _context.UserRoles on user.Id equals userrole.UserId
                        join role in _context.Roles on
userrole.RoleId equals role.Id
                        where role.Name == "sale agent"
                        join distagent in _context.DistributorAgents on user.Id equals distagent.UserId
                        where distagent.DistributorId == distributorAgents.DistributorId
                        join agentcus in _context.AgentCustomer on user.Id equals agentcus.SaleAgentId
                        join
agentordstat in _context.AgentOrderStatus on agentcus.Id equals agentordstat.AgentCustomerId
                        join tartype in _context.TargetStatusType on
agentordstat.AgentTargetStatusId equals tartype.Id
                        join ordertype in _context.OrderStatusType on agentordstat.OrderStatusId equals ordertype.Id
                      //  join
                      //  orderprod in _context.OrderProducts on agentordstat.Id equals orderprod.AgentOrderStatusId join invent in _context.Inventory on
                      //   orderprod.InventoryId equals invent.Id join Prod in _context.Products on invent.ProductId equals Prod.Id
                        select new
                        {
                            agentObject = user,
                            customerObject = (from customer in _context.Users where customer.Id == agentcus.CustomerId select new { customerObject = customer }).FirstOrDefault(),
                            TargetType = tartype.Type,
                            OrderType = ordertype.OrderStatus,
                             ProductInventoryList=(from orderprod in _context.OrderProducts where agentordstat.Id == orderprod.AgentOrderStatusId join invent in 
                             _context.Inventory on orderprod.InventoryId equals invent.Id join Prod in _context.Products on invent.ProductId equals Prod.Id
                                          select new { productObj = Prod, inventoryObj = invent,orderProd=orderprod }).ToList(),
                         

                        }
                   ).ToList();
            return Ok(new { distributorAgentCustomerDetailStatus = "GetSuccess", distributorAgentCustomerDetailList = data });

        }
                   [HttpPost]
        [Route("CreateAgentJourneyPlan")]
        public async Task<ActionResult<AgentJourneyPlanView>> CreateAgentJourneyPlan(AgentJourneyPlanView agentJourneyPlanView)
        {

            List<int> customerIdList = new List<int>();
            int agentId = _context.Users.Where(obj => obj.FirstName + ' ' + obj.LastName == agentJourneyPlanView.saleAgentName).FirstOrDefault().Id;

            //    string status = "";
            for (int i = 0; i < agentJourneyPlanView.customerNameList.Count; i++)
            {
                AgentOrderStatus agentOrderStatus = new AgentOrderStatus();
                agentOrderStatus.AgentCustomerId = getAgentCustomerId(agentJourneyPlanView.customerNameList[i], agentId);
                agentOrderStatus.StartDate = System.DateTime.Parse(agentJourneyPlanView.startDate);
                agentOrderStatus.EndDate = System.DateTime.Parse(agentJourneyPlanView.endDate);
                agentOrderStatus.AgentTargetStatusId = 1;
                agentOrderStatus.OrderStatusId = 1;
                _context.AgentOrderStatus.Add(agentOrderStatus);
                await _context.SaveChangesAsync();

            }
            var data = (from user in _context.Users
                        join userrole in _context.UserRoles on user.Id equals userrole.UserId
                        join role in _context.Roles on
userrole.RoleId equals role.Id
                        where role.Name == "sale agent"
                        join distagent in _context.DistributorAgents on user.Id equals distagent.UserId
                        where distagent.DistributorId == agentJourneyPlanView.distId
                        join agentcus in _context.AgentCustomer on user.Id equals agentcus.SaleAgentId
                        join
agentordstat in _context.AgentOrderStatus on agentcus.Id equals agentordstat.AgentCustomerId
                        join tartype in _context.TargetStatusType on
agentordstat.AgentTargetStatusId equals tartype.Id
                        join ordertype in _context.OrderStatusType on agentordstat.OrderStatusId equals ordertype.Id
                        //join
                        //orderprod in _context.OrderProducts on agentordstat.Id equals orderprod.AgentOrderStatusId join invent in _context.Inventory on
                        // orderprod.InventoryId equals invent.Id join Prod in _context.Products on invent.ProductId equals Prod.Id
                        select new
                        {
                            agentObject = user,
                            CustomerName = (from customer in _context.Users where customer.Id == agentcus.CustomerId select new { customerObject = customer }).FirstOrDefault(),
                            TargetType = tartype.Type,
                            OrderType = ordertype.OrderStatus
                        }
                     ).ToList();
            //    status = "success";
            return Ok(new { AgentJourneyPlanStatus = "SaveSuccess", distributorAgentCustomerDetailList = data });

            //   return Ok(new { AgentJourneyPlanStatus = status });

        }
        public int getAgentCustomerId(string customerName,int saleAgentId)
        {
            Boolean isExist = false;
            int Id = 0;
          
            int customerId = _context.Users.Where(obj => obj.FirstName + ' ' + obj.LastName == customerName).FirstOrDefault().Id;
            isExist = _context.AgentCustomer.Any(obj => obj.CustomerId == customerId && obj.SaleAgentId == saleAgentId);
            if (isExist)
            {
                Id = _context.AgentCustomer.Where(obj => obj.SaleAgentId == saleAgentId && obj.CustomerId == customerId).FirstOrDefault().Id;
            }
            else
            {
                AgentCustomer NewagentCustomer = new AgentCustomer();
                NewagentCustomer.CustomerId = customerId;
                NewagentCustomer.SaleAgentId = saleAgentId;
                _context.AgentCustomer.Add(NewagentCustomer);
                _context.SaveChanges();
                Id = NewagentCustomer.Id;
            }
            return Id;
        }

        // DELETE: api/AgentCustomers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AgentCustomer>> DeleteAgentCustomer(int id)
        {
            var agentCustomer = await _context.AgentCustomer.FindAsync(id);
            if (agentCustomer == null)
            {
                return NotFound();
            }

            _context.AgentCustomer.Remove(agentCustomer);
            await _context.SaveChangesAsync();

            return agentCustomer;
        }

        [HttpPost]
        [Route("GetSpecificJourneyPlan")]
        public async Task<ActionResult<AgentJourneyPlanView>> GetSpecificJourneyPlan(AgentOrderStatus agentOrderStat)
        {

            
            var data=(from agentOrderStatus in _context.AgentOrderStatus where agentOrderStatus.Id== agentOrderStat.Id  join targettype in _context.TargetStatusType on 
                      agentOrderStatus.AgentTargetStatusId equals targettype.Id  join ordertype in _context.OrderStatusType on 
                      agentOrderStatus.OrderStatusId equals ordertype.Id select new
                      {targettype= targettype.Type,ordertype= ordertype.OrderStatus,agentOrderStatusObject= agentOrderStatus
                      });

            return Ok(new { AgentViewJourneyPlanStatus = "GetSpecificSuccess", specificjourneyplan = data });

            //   return Ok(new { AgentJourneyPlanStatus = status });

        }

        [HttpPut]
        [Route("updateJourneyPlan_Delivery")]
        public async Task<ActionResult<AgentJourneyPlanView>> updateJourneyPlan(AgentJourneyPlanView agentJourneyPlanView)
        {

            AgentOrderStatus agentOrderStatus = _context.AgentOrderStatus.Where(obj => obj.Id == agentJourneyPlanView.agentOrderStatusId).FirstOrDefault();
            agentOrderStatus.OrderStatusId = 2;
            agentOrderStatus.AgentTargetStatusId = 1;
            agentOrderStatus.StartDate = System.DateTime.Parse(agentJourneyPlanView.startDate);
            agentOrderStatus.EndDate = System.DateTime.Parse(agentJourneyPlanView.endDate);
            _context.AgentOrderStatus.Update(agentOrderStatus);
            _context.SaveChangesAsync();


            var data = (from user in _context.Users
                        join userrole in _context.UserRoles on user.Id equals userrole.UserId
                        join role in _context.Roles on
userrole.RoleId equals role.Id
                        where role.Name == "sale agent"
                        join distagent in _context.DistributorAgents on user.Id equals distagent.UserId
                        where distagent.DistributorId == agentJourneyPlanView.distId
                        join agentcus in _context.AgentCustomer on user.Id equals agentcus.SaleAgentId
                        join
agentordstat in _context.AgentOrderStatus on agentcus.Id equals agentordstat.AgentCustomerId
                        join tartype in _context.TargetStatusType on
agentordstat.AgentTargetStatusId equals tartype.Id
                        join ordertype in _context.OrderStatusType on agentordstat.OrderStatusId equals ordertype.Id
                        //join
                        //orderprod in _context.OrderProducts on agentordstat.Id equals orderprod.AgentOrderStatusId join invent in _context.Inventory on
                        // orderprod.InventoryId equals invent.Id join Prod in _context.Products on invent.ProductId equals Prod.Id
                        select new
                        {
                            agentObject = user,
                            CustomerName = (from customer in _context.Users where customer.Id == agentcus.CustomerId select new { customerObject = customer }).FirstOrDefault(),
                            TargetType = tartype.Type,
                            OrderType = ordertype.OrderStatus
                        }
                   ).ToList();
            //    status = "success";
            return Ok(new { AgentJourneyPlanStatus = "UpdateSuccess", distributorAgentCustomerDetailList = data });

        }
        private bool AgentCustomerExists(int id)
        {
            return _context.AgentCustomer.Any(e => e.Id == id);
        }
    }
}
