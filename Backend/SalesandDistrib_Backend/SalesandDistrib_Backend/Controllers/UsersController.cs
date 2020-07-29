using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesandDistrib_Backend.Models;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Account
        [HttpGet]
        [Route("GetDistributors")]
        public ActionResult<Users> GetUsers()
        {
            int roleId = _context.Roles.Where(obj => obj.Name == "Distributor").FirstOrDefault().Id;
            List<UserRoles> userRoleList = _context.UserRoles.Where(obj => obj.RoleId == roleId).ToList();
            List<UsersView> distributorList = new List<UsersView>();

            foreach (UserRoles userRole in userRoleList)
            {
                Users user = _context.Users.Where(obj => obj.Id == userRole.UserId).FirstOrDefault();
                Store store = _context.Store.Where(obj => obj.UserId == user.Id).FirstOrDefault();

                UsersView allDetail = new UsersView();
                allDetail.FirstName = user.FirstName;
                allDetail.LastName = user.LastName;
                allDetail.Email = user.Email;
                allDetail.Contact = user.Contact;

                allDetail.StoreName = store.Name;

                allDetail.Address = user.Address;

                distributorList.Add(allDetail);

            }

            return Ok(new { DistributorStatus = "GetAll", allDistributors = distributorList });
        }

        // GET: api/Account/5
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

        // PUT: api/Account/5
        [HttpPut("{id}")]

        public ActionResult PutUsers([FromRoute] int id, [FromBody] UsersView usersView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usersView.UserId)
            {
                return BadRequest();
            }

            //_context.Entry(users).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!UsersExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
            //     Users prevUserData = _context.Users.Find(id);

            //    var users = _context.Users.AsNoTracking().ToList();

            Users updateUserData = new Users();
            updateUserData.FirstName = usersView.FirstName;
            updateUserData.LastName = usersView.LastName;
            updateUserData.Email = usersView.Email;
            updateUserData.Contact = usersView.Contact;
            updateUserData.Address = usersView.Address;
            updateUserData.Password = usersView.Password;
            updateUserData.Id = usersView.UserId;
            //prevUserData.Password;


            _context.Users.Update(updateUserData);
            // _context.Entry(updateUserData).State = EntityState.Modified;

            //  _context.Users.AsNoTracking().ToList();

            int updatedRoleId = _context.Roles.Where(obj => obj.Name == usersView.RoleName).FirstOrDefault().Id;
            UserRoles newAssignedRole = new UserRoles();
            newAssignedRole.Id = usersView.RoleId;//prevUserRoleId;
            newAssignedRole.UserId = usersView.UserId;
            newAssignedRole.RoleId = updatedRoleId;

            _context.UserRoles.Update(newAssignedRole);
            _context.SaveChanges();
            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id
                        join
distributor_Agents in _context.DistributorAgents on u.Id equals distributor_Agents.UserId
                        where distributor_Agents.DistributorId == usersView.DistId
                        select new { User = u, User_Role = roles }).ToList();

            return Ok(new
            {
                UserStatus = "UpdateSuccess",
                usersList = data
            });
        }




        [HttpPost]
        [Route("CreateUser")]  //create customer and agent user //[FromBody] UsersView userView
        public async Task<IActionResult> CreateUser([FromBody] UsersView userView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //  int userId = _context.Users.Max(obj => obj.Id) + 1;
            //    int roleId= _context.Roles.Max(obj => obj.Id) + 1;
            Users users = new Users();

            users.FirstName = userView.FirstName;
            users.LastName = userView.LastName;
            users.Email = userView.Email;
            users.Contact = userView.Contact;
            users.Address = userView.Address;
            users.Password = "Numan311@";
            _context.Users.Add(users);


            //Roles adminRole = new Roles();
            //adminRole.Name = userView.RoleName;
            //_context.Roles.Add(adminRole);

            int roleId = _context.Roles.Where(obj => obj.Name == userView.RoleName).FirstOrDefault().Id;
            await _context.SaveChangesAsync();
            UserRoles userRole = new UserRoles();
            userRole.UserId = users.Id;
            userRole.RoleId = roleId;
            _context.UserRoles.Add(userRole);

            List<string> saleAgentPossibleList = new List<string>()
            {
                "sale agent","saleagent",
            };

            //if (saleAgentPossibleList.Contains(userView.RoleName.ToLower()))
            //{
            DistributorAgents distributorAgents = new DistributorAgents();
            distributorAgents.DistributorId = userView.DistId;
            distributorAgents.UserId = users.Id;
            _context.DistributorAgents.Add(distributorAgents);

        //}
           
            // await
            await _context.SaveChangesAsync();

            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id
                        join
distributor_Agents in _context.DistributorAgents on u.Id equals distributor_Agents.UserId
                        where distributor_Agents.DistributorId == userView.DistId
                        select new { User = u, User_Role = roles }).ToList();

            return Ok(new
            {
                UserStatus = "UserRegisteredSuccess",
                usersList = data
            });
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }


        [HttpPost]
        [Route("GetUser")]  //get customer and agent user //[FromBody] UsersView userView
        public ActionResult<UsersView> getUser([FromBody] UsersView userView)
        {

            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id
                        join
distributor_Agents in _context.DistributorAgents on u.Id equals distributor_Agents.UserId
                        where distributor_Agents.DistributorId == userView.DistId
                        select new { User = u, User_Role = roles }).ToList();

            return Ok(new
            {
                UserStatus = "GetSuccess",
                usersList = data
            });
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        [HttpDelete]
        [Route("DeleteUser")]  //get customer and agent user //[FromBody] UsersView userView
        public ActionResult<UsersView> deleteUser([FromBody] UsersView userView)
        {
            UserRoles userRole = _context.UserRoles.Where(obj => obj.UserId == userView.UserId).FirstOrDefault();
            _context.Remove(userRole);

            DistributorAgents distributorAgent = _context.DistributorAgents.Where(obj => obj.UserId == userView.UserId).FirstOrDefault();
            _context.Remove(distributorAgent);

            Users userbeing_deleted = _context.Users.Find(userView.UserId);
            _context.Remove(userbeing_deleted);

            _context.SaveChanges();

            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id
                        join
distributor_Agents in _context.DistributorAgents on u.Id equals distributor_Agents.UserId
                        where distributor_Agents.DistributorId == userView.DistId
                        select new { User = u, User_Role = roles }).ToList();

            return Ok(new
            {
                UserStatus = "DeleteSuccess",
                usersList = data
            });
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        [HttpGet("{userId}")]
        //  [Route("GetUserbyId")]  //get customer and agent user //[FromBody] UsersView userView
        public ActionResult getUserbyId([FromRoute] int userId)
        {


            var data = (from u in _context.Users
                        join user_Role in _context.UserRoles on u.Id equals user_Role.UserId
                        where user_Role.UserId == userId
                        join
roles in _context.Roles on user_Role.RoleId equals roles.Id
                        //      
                        select new { User = u, User_Role = roles, userRoleId = user_Role.Id }).FirstOrDefault();

            return Ok(new
            {
                UserStatus = "GetSpecificcSuccess",
                userDetail = data
            });
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }


        [HttpPost] //httpget not work
        [Route("RolebyDistributor")]
        public ActionResult<Roles> GetRoles([FromBody] UsersView users)
        {
            var roles = (from role in _context.Roles
                         join rolePrivilge in _context.RolePrivileges on
role.Id equals rolePrivilge.RoleId
                         where rolePrivilge.DistributorId == users.DistId
                         select new { RoleName = role.Name }
                       ).ToList();
            return Ok(new
            {
                GetRoleStatus = "GetSuccess",
                rolesList = roles
            });
        }

        //[Route("Gett")]
        //[HttpGet]
        //public ActionResult<UsersView> getUser()
        //{
        //    List<UsersView> userList = new List<UsersView>();
        //    UsersView usersView = new UsersView();

        //    var data = (from u in _context.Users join userRole in _context.UserRoles on u.Id equals userRole.UserId join
        //                role in _context.Roles on userRole.RoleId equals role.Id join
        //                distributorAgents in _context.DistributorAgents on u.Id equals distributorAgents.UserId where distributorAgents.DistributorId==2
        //                select new {User=u , roles = role }).ToList();
        //    return Ok(new { userList = data });
        //}
        // POST: api/Account
        [Route("DistRegister")]
        [HttpPost]
        public async Task<IActionResult> PostDistributor([FromBody] UsersView distributor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Users users = new Users();
            users.FirstName = distributor.FirstName;
            users.LastName = distributor.LastName;
            users.Email = distributor.Email;
            users.Contact = distributor.Contact;
            users.Address = distributor.Address;
            users.Password = "Numan311@";
            _context.Users.Add(users);

            Roles role = new Roles();
            bool isExist = _context.Roles.Any(obj => obj.Name == "Distributor");
            if (!isExist)
            {

                role.Name = "Distributor";
                _context.Roles.Add(role);
            }
            else if (isExist)
            {
                role = _context.Roles.Where(obj => obj.Name == "Distributor").FirstOrDefault();
            }

            await _context.SaveChangesAsync();
            DistributorInfo detail = new DistributorInfo();
            detail.DistributorId = users.Id;
            detail.City = distributor.City;
            detail.Province = distributor.Province;
            detail.PostalCode = distributor.PostalCode;
            detail.Country = distributor.Country;
            _context.DistributorDetail.Add(detail);

            Store store = new Store();
            store.UserId = users.Id;
            store.Name = distributor.StoreName;
            _context.Store.Add(store);
         
            UserRoles userRole = new UserRoles();
            userRole.UserId = users.Id;
            userRole.RoleId = role.Id;
            _context.UserRoles.Add(userRole);
            await _context.SaveChangesAsync();
            return Ok(new { AccountStatus = "RegisteredSuccess" });
            //            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }




        [Route("Login")]
        [HttpPost]
        public ActionResult Authenticate([FromBody] Users users)
        {
            string securityKey = "this_is_our_super_long_key_for_token_validation_project_2019_06_28$smesk.in";
            var symmetricSecuritykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));


            //var claims = new List<Claim>();
            //claims.Add(new Claim(ClaimTypes.Role, "Administrator"));
            //HmacSha256Signature
            var signingCredentials = new SigningCredentials(symmetricSecuritykey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                   issuer: "smesk.in",
                   audience: "readers",
                   // notBefore:DateTime.UtcNow,
                   expires: DateTime.UtcNow.AddMinutes(5),
                   //  claims:claims,
                   signingCredentials: signingCredentials
                   );

            bool isExist = _context.Users.Any(obj => obj.Email == users.Email && obj.Password == users.Password);
            if (isExist)
            {
                int UserId = _context.Users.Where(obj => obj.Email == users.Email && obj.Password == users.Password).FirstOrDefault().Id;

                
                
                var distAgent = (from u in _context.Users where u.Id==UserId join userRole in _context.UserRoles  on u.Id equals userRole.UserId join role in _context.Roles
                                   on userRole.RoleId equals role.Id where role.Name == "sale agent" join dist_Agent in _context.DistributorAgents 
                               on  u.Id equals dist_Agent.UserId select new { distId = dist_Agent.DistributorId }).ToList();
                if (distAgent.Count != 0)
                {
                    return Ok(new
                    {
                        signInStatus = "Authorized",
                        userId = UserId,
                        DistId = distAgent[0].distId,
                     });
                }
                return Ok(new
                {
                    signInStatus = "Authorized",
                    userId = UserId,
                    token = new JwtSecurityTokenHandler().WriteToken(token)

                });


            }
            return Ok(new { signInStatus = "Not_Authorized" });
        }
        // DELETE: api/Account/5
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
