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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
     //   public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
     public ActionResult<Products> GetProducts()
        {
            return Ok(new { ProductStatus = "GetAll", AllProducts = _context.Products });  ///get as packageStatus

            //  return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return Ok(new { ProductStatus = "GetSpecific", products = _context.Products });  ///get as packageStatus
         //   return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.Id)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    //return NotFound();
                    return Ok(new { ProductStatus = "NotFound" });
                }
                else
                {
                    throw;
                }
            }


            return Ok(new { ProductStatus = "UpdatedSuccess", products = _context.Products });  ///get as packageStatus
            //return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetProducts", new { id = products.Id }, products);
            return Ok(new { ProductStatus = "CreatedSuccess", products = _context.Products });  ///get as packageStatus
        }

        [HttpPost]
        [Route("SpecificDistProd")]  //product of specific distributorId
        public async Task<ActionResult<Products>> GetDistProducts(Products products)
        {

            List<Products> listProduct = _context.Products.Where(obj => obj.DistributorId == products.DistributorId).ToList();
            // return CreatedAtAction("GetProducts", new { id = products.Id }, products);
            return Ok(new { ProductStatus = "GetAll", products = listProduct });  ///get as packageStatus
        }
        
        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return Ok(new { ProductStatus = "NotFound" });  ///get as packageStatus
             //   return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();
            return Ok(new { ProductStatus = "DeletedSuccess",
                AllProducts = _context.Products});  ///get as packageStatus
           // return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
