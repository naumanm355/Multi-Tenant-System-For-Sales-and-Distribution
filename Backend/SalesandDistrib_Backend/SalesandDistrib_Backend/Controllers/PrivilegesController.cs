using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SalesandDistrib_Backend.Models;

namespace SalesandDistrib_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivilegesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PrivilegesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Privileges
        [HttpGet]
        public ActionResult<SelectedPrivileges> GetPrivileges()
        {
            return Ok(new { list = _context.RolePrivileges });
        }


        // GET: api/Privileges/5
        [HttpGet("{id}")]
        // [Route("getRolePrivilge")]
        public ActionResult GetPrivilegesbyDis([FromRoute] int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var privileges = await _context.Privileges.FindAsync(id);

            //if (privileges == null)
            //{
            //    return NotFound();
            //}

            //return Ok(privileges);
            var dataList = (from Role in _context.Roles
                            join rolePrivilege in _context.RolePrivileges
on Role.Id equals rolePrivilege.RoleId
                            where rolePrivilege.DistributorId == id
                            join privilege in _context.Privileges on rolePrivilege.PrivilgeId equals privilege.Id
                            orderby Role.Name
                            select new { role = Role, Privilege = privilege, rolePrv = rolePrivilege }).ToList();
            return Ok(new { GetRolePrivilegesStatus = "GetSuccess", RolePrivilegesList = dataList });

        }




        [HttpPost]
        [Route("GetPrivilegesofSpecificRole")]
        public ActionResult GetAllPrivilegesbyDisId([FromBody] UsersView distributor)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var privileges = await _context.Privileges.FindAsync(id);

            //if (privileges == null)
            //{
            //    return NotFound();
            //}

            //return Ok(privileges);
            var dataList = (from Role in _context.Roles
                            where Role.Id == distributor.RoleId
                            join rolePrivilege in _context.RolePrivileges
on Role.Id equals rolePrivilege.RoleId
                            where rolePrivilege.DistributorId == distributor.UserId
                            join privilege in _context.Privileges on rolePrivilege.PrivilgeId equals privilege.Id
                            //    orderby Role.Name
                            select new { role = Role, Privilege = privilege, rolePrv = rolePrivilege }).ToList();
            return Ok(new { GetRolePrivilegesStatus = "GetSuccess", RolePrivilegesList = dataList });
            ;
        }

        // PUT: api/Privileges/5
        [HttpPut("{id}")]
        [Route("UpdateRolePrivilege")]
        public ActionResult PutPrivileges([FromRoute] int id, [FromBody] RolePrivilegesView rolePrivileges)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            if (rolePrivileges.selectedPrivileges.Count <= rolePrivileges.rolePrivilegeId.Count)
            {
                for (int i = 0; i < rolePrivileges.selectedPrivileges.Count; i++)
                {

                    SelectedPrivileges updated = new SelectedPrivileges();
                    updated.Id = rolePrivileges.rolePrivilegeId[i];
                    updated.DistributorId = id;//rolePrivileges.distId;
                    updated.RoleId = getRoleId(rolePrivileges.RoleName);
                    updated.PrivilgeId = getPrivilegesId(rolePrivileges.selectedPrivileges[i]);
                    _context.RolePrivileges.Update(updated);
                    _context.SaveChanges();
                }
                if (rolePrivileges.selectedPrivileges.Count < rolePrivileges.rolePrivilegeId.Count)
                {
                    for (int i = rolePrivileges.selectedPrivileges.Count; i < rolePrivileges.rolePrivilegeId.Count; i++)
                    {

                        SelectedPrivileges privilegeBeingDeleted = _context.RolePrivileges.Find(rolePrivileges.rolePrivilegeId[i]);
                        _context.RolePrivileges.Remove(privilegeBeingDeleted);

                    }

                }
                _context.SaveChanges();

            }
            else if (rolePrivileges.selectedPrivileges.Count > rolePrivileges.rolePrivilegeId.Count)
            {
                for (int i = 0; i < rolePrivileges.rolePrivilegeId.Count; i++)
                {

                    SelectedPrivileges updated = new SelectedPrivileges();
                    updated.Id = rolePrivileges.rolePrivilegeId[i];
                    updated.DistributorId = id;//rolePrivileges.distId;
                    updated.RoleId = getRoleId(rolePrivileges.RoleName);
                    updated.PrivilgeId = getPrivilegesId(rolePrivileges.selectedPrivileges[i]);
                    _context.RolePrivileges.Update(updated);

                }
                for (int i = rolePrivileges.rolePrivilegeId.Count; i < rolePrivileges.selectedPrivileges.Count; i++)
                {

                    SelectedPrivileges assignNew = new SelectedPrivileges();
                    assignNew.DistributorId = id;
                    assignNew.RoleId = getRoleId(rolePrivileges.RoleName);
                    assignNew.PrivilgeId = getPrivilegesId(rolePrivileges.selectedPrivileges[i]);
                    _context.RolePrivileges.Add(assignNew);

                    _context.SaveChanges();
                }

            }
            //if (id != privileges.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(privileges).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!PrivilegesExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}


            var dataList = (from Role in _context.Roles
                            join rolePrivilege in _context.RolePrivileges
on Role.Id equals rolePrivilege.RoleId
                            where rolePrivilege.DistributorId == id
                            join privilege in _context.Privileges on rolePrivilege.PrivilgeId equals privilege.Id
                            orderby Role.Name
                            select new { role = Role, Privilege = privilege, rolePrv = rolePrivilege }).ToList();
            return Ok(new { updateRolePrivilegesStatus = "UpdateSuccess", RolePrivilegesList = dataList });
        }

        int getRoleId(string name)
        {
            return _context.Roles.Where(obj => obj.Name == name).FirstOrDefault().Id;
        }
        // POST: api/Privileges
        //[HttpPost]
        //public async Task<IActionResult> PostPrivileges([FromBody] Privileges privileges)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.Privileges.Add(privileges);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetPrivileges", new { id = privileges.Id }, privileges);
        //}
        public int getPrivilegesId(string priv)
        {
            bool isExist = _context.Privileges.Any(obj => obj.Name == priv);
            Privileges privObj = new Privileges();
            if (!isExist)
            {
                privObj.Name = priv;
                _context.Privileges.Add(privObj);
                _context.SaveChanges();
            }
            else
            {
                privObj = _context.Privileges.Where(obj => obj.Name == priv).FirstOrDefault();
            }
          
            return privObj.Id;
        }

        [HttpPost]
        [Route("AssignPrivilege")]
        public ActionResult PostRolePrivileges([FromBody] RolePrivilegesView rolePrivileges)
        {



            Roles role = new Roles();
            bool roleExist = _context.Roles.Any(obj => obj.Name == rolePrivileges.RoleName);
            if (!roleExist)
            {

                role.Name = rolePrivileges.RoleName;
                _context.Roles.Add(role);
                _context.SaveChanges();
            }
            else if (roleExist)
            {
                role = _context.Roles.Where(obj => obj.Name == rolePrivileges.RoleName).FirstOrDefault();
            }


            for (int i = 0; i < rolePrivileges.selectedPrivileges.Count; i++)
            {
                SelectedPrivileges selectedPrivilege = new SelectedPrivileges();
                selectedPrivilege.DistributorId = rolePrivileges.distId;
                selectedPrivilege.RoleId = role.Id;
                selectedPrivilege.PrivilgeId = getPrivilegesId(rolePrivileges.selectedPrivileges[i]);
                _context.RolePrivileges.Add(selectedPrivilege);
                _context.SaveChanges();
            }
           
            var dataList = (from Role in _context.Roles
                            join rolePrivilege in _context.RolePrivileges
on Role.Id equals rolePrivilege.RoleId
                            where rolePrivilege.DistributorId == rolePrivileges.distId
                            join privilege in _context.Privileges on rolePrivilege.PrivilgeId equals privilege.Id
                            orderby Role.Name
                            select new { role = Role, Privilege = privilege }).ToList();
            return Ok(new { AssignRolePrivilegesStatus = "Success", RolePrivilegesList = dataList });
        }
        // DELETE: api/Privileges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrivileges([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var privileges = await _context.Privileges.FindAsync(id);
            if (privileges == null)
            {
                return NotFound();
            }

            _context.Privileges.Remove(privileges);
            await _context.SaveChangesAsync();

            return Ok(privileges);
        }


        private bool PrivilegesExists(int id)
        {
            return _context.Privileges.Any(e => e.Id == id);
        }
    }
}
