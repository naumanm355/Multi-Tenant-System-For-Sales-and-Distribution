using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesandDistrib_Backend.Models;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AgentCustomer>>> GetAgentCustomer()
        {
            return await _context.AgentCustomer.ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{saleagentId}")]  //get all customer of sale agent
       // [Route("GetagentCustomer")]
        public async Task<ActionResult<AgentCustomer>> GetAgentCustomer(int saleagentId)
        {
            //var agentCustomer = await _context.AgentCustomer.FindAsync(id);

            //if (agentCustomer == null)
            //{
            //    return NotFound();
            //}
         var agentCustomers = (from u in _context.Users
                                  join userRoles in _context.UserRoles
       on u.Id equals userRoles.UserId
                                  join role in _context.Roles on userRoles.RoleId equals role.Id
                                  join
agentCustomer in _context.AgentCustomer on u.Id equals agentCustomer.CustomerId
                                  where
agentCustomer.SaleAgentId == saleagentId
                                  join agentOrderStatus in _context.AgentOrderStatus on agentCustomer.Id equals
                           agentOrderStatus.AgentCustomerId
                                  join orderstatustype in _context.OrderStatusType on agentOrderStatus.OrderStatusId equals orderstatustype.Id
                                  join agentargettype in _context.TargetStatusType on agentOrderStatus.AgentTargetStatusId equals agentargettype.Id

select new { customerInfo = u, ordertype = orderstatustype, targettype = agentargettype,agent_Customer=agentCustomer,agentOrderStatusObject= agentOrderStatus}).ToList();
      return Ok(new { getAgentCustomersStatus = "GetSuccess", agentCustomerList = agentCustomers });
        }

        // PUT: api/Customers/5
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

        // POST: api/Customers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AgentCustomer>> PostAgentCustomer(AgentCustomer agentCustomer)
        {
            _context.AgentCustomer.Add(agentCustomer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAgentCustomer", new { id = agentCustomer.Id }, agentCustomer);
        }

        // DELETE: api/Customers/5
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

        private bool AgentCustomerExists(int id)
        {
            return _context.AgentCustomer.Any(e => e.Id == id);
        }
    }
}
