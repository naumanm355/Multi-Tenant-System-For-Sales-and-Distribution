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
 ////   [EnableCors("AllowMyOrigin")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Inventory
        // [HttpGet]
        [HttpGet("{id}")]
      //  [Route("GetInventory")] //inventory or stock of distributor by its id
        public ActionResult<Inventory> GetAllInventory([FromRoute] int id)
        {
            //  return await _context.Inventory.ToListAsync();
            var data = (from p in _context.Products where p.DistributorId==id
                        join inv in _context.Inventory on p.Id equals inv.ProductId
                        select new { product = p, inventory = inv }).ToList();
            return Ok(new { InventoryStatus = "GetAll", inventoryList = data });  ///get as packageStatus
        }

        // GET: api/Inventory/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Inventory>> GetInventory(int id)
        //{
        //    var inventory = await _context.Inventory.FindAsync(id);

        //    if (inventory == null)
        //    {
        //        return Ok(new { InventoryStatus = "NotFound" });  ///get as packageStatus
        //       // return NotFound();
        //    }

        //    return Ok(new { InventoryStatus = "GetSpecific", inventorySpecific = inventory });  ///get as packageStatus
        //  //  return inventory;
        //}

        // PUT: api/Inventory/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPut("{id}")]
        //public IActionResult PutInventory(int id, ProductInventoryView pInV)
        //{
        //    if (id != pInV.inventoryId)
        //    {
        //        //return BadRequest();
        //        return Ok(new { InventoryStatus = "InvalidInput" });  ///get as packageStatus
        //    }
        //    Inventory updateInventory = new Inventory();
        //    updateInventory.Id = pInV.inventoryId;
        //    updateInventory.ProductId = _context.Products.Where(obj => obj.Name == pInV.products.Name && obj.Category == pInV.products.Category && obj.DistributorId == pInV.products.DistributorId).FirstOrDefault().Id;
        //    updateInventory.TotalPacket_Cartoon = pInV.inventory.TotalPacket_Cartoon;
        //    updateInventory.Price = pInV.inventory.Price;
        //    _context.Inventory.Update(updateInventory);
        //    _context.SaveChanges();
        //    var data = (from p in _context.Products
        //                where p.DistributorId == id
        //                join inv in _context.Inventory on p.Id equals inv.ProductId
        //                select new { product = p, inventory = inv }).ToList();
        //    return Ok(new { InventoryStatus = "UpdateSuccess", inventoryList = data });


        //    //_context.Entry(pInV.inventory).State = EntityState.Modified;

        //    //try
        //    //{
        //    //    await _context.SaveChangesAsync();
        //    //    var data = (from p in _context.Products
        //    //                where p.DistributorId == id
        //    //                join inv in _context.Inventory on p.Id equals inv.ProductId
        //    //                select new { product = p, inventory = inv }).ToList();
        //    //    return Ok(new { InventoryStatus = "UpdateSuccess", inventoryList = data });  ///get as packageStatus
        //    //}
        //    //catch (DbUpdateConcurrencyException)
        //    //{
        //    //    if (!InventoryExists(id))
        //    //    {
        //    //        //  return NotFound();
        //    //        return Ok(new { InventoryStatus = "NotFound"});  ///get as packageStatus
        //    //    }
        //    //    else
        //    //    {
        //    //        throw;
        //    //    }
        //    //  }

        //    //  return NoContent();

        //}

        // POST: api/Inventory
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Inventory>> PostInventory(ProductInventoryView pInV)
        {

            Inventory newInventory = new Inventory();
            newInventory.ProductId = _context.Products.Where(obj => obj.Name == pInV.Name && obj.Category == pInV.Category && obj.DistributorId == pInV.DistId).FirstOrDefault().Id;
            newInventory.TotalPacket_Cartoon = pInV.TotalCarton;
            newInventory.Price = pInV.PriceperCarton;
            _context.Inventory.Add(newInventory);
            await _context.SaveChangesAsync();
            var data = (from p in _context.Products
                        where p.DistributorId == pInV.DistId
                        join inv in _context.Inventory on p.Id equals inv.ProductId
                        select new { product = p, inventory = inv }).ToList();
            return Ok(new { InventoryStatus = "CreatedSuccess",inventoryList=data });  ///get as packageStatus
        //    return CreatedAtAction("GetInventory", new { id = inventory.Id }, inventory);
        }

        // DELETE: api/Inventory/5
        [HttpDelete("{invId}/{DistId}")]
        public async Task<ActionResult<Inventory>> DeleteInventory(int invId,int DistId)
        {
            var inventory = await _context.Inventory.FindAsync(invId);
            if (inventory == null)
            {
                //   return NotFound();
                return Ok(new { InventoryStatus = "NotFound"});  ///get as packageStatus
            }

            _context.Inventory.Remove(inventory);
            await _context.SaveChangesAsync();
            var data = (from p in _context.Products
                        where p.DistributorId == DistId
                        join inv in _context.Inventory on p.Id equals inv.ProductId
                        select new { product = p, inventory = inv }).ToList();
            //  return inventory;
            return Ok(new { InventoryStatus = "GetAll", inventoryList = data });  ///get as packageStatus
        }

        private bool InventoryExists(int id)
        {
            return _context.Inventory.Any(e => e.Id == id);
        }
    }
}
