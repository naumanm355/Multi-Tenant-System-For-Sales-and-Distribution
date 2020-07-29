using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SalesandDistrib_Backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Customer
        [HttpGet("{saleAgentId}")]
        [Route("GetAgentCustomer")]
        public ActionResult<UsersView> GetUsers([FromRoute] int saleAgentId)
        {
            // return _context.Users;
            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id

                        join agent_customer in _context.AgentCustomer
on u.Id equals agent_customer.CustomerId
                        where agent_customer.SaleAgentId == saleAgentId
                        select new { User = u, UserRole = roles }).ToList();


            return Ok(new
            {
                UserStatus = "GetSuccess",
                usersList = data
            });
        }

        // GET: api/Customer/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetUsers([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var users = await _context.Users.FindAsync(id);

        //    if (users == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(users);
        //}

        // PUT: api/Customer/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers([FromRoute] int id, [FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST: api/Customer
        [HttpPost]
        public async Task<IActionResult> PostUsers([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(users);
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}