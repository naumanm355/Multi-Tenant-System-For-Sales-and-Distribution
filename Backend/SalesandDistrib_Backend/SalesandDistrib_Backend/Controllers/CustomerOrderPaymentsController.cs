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
    public class CustomerOrderPaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerOrderPaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomerOrderPayments
        [HttpGet("{SaleAgentId}")]  // get customer(of specific sale agent with outstanding balance with name,order date,amount paid,billAmount 
        public async Task<ActionResult<List<CustomerOrderPayment>>> GetCustomerOrderPayment(int SaleAgentId)
        {
            string status = "";
         
            try
            {
                var customerwith_OutBillance = (
                    from u in _context.Users
                    join agent_customer in _context.AgentCustomer on u.Id equals agent_customer.CustomerId
                    where agent_customer.SaleAgentId == SaleAgentId
                    join agent_order_status in _context.AgentOrderStatus on agent_customer.Id equals agent_order_status.AgentCustomerId
                    join order_product in _context.OrderProducts on agent_order_status.Id equals order_product.AgentOrderStatusId
                    join inventory in _context.Inventory on order_product.InventoryId equals inventory.Id
                    join customer_orderpayment in _context.CustomerOrderPayment on agent_order_status.Id equals
                    customer_orderpayment.AgentOrderStatusId
                    group new
                    {
                        agent_order_status
                   ,
                        order_product,
                        inventory,
                        customer_orderpayment
                    } by new
                    {
                        u.FirstName,
                        u.LastName,
                        agent_order_status.Id,
                        agent_order_status.AgentCustomerId,
                        order_product.OrderDate

                    } into all
                    where all.Sum(obj => obj.customer_orderpayment.AmountPaid) / ((from order_product_tb in _context.OrderProducts
                                                                                   where order_product_tb.AgentOrderStatusId == all.Key.Id
                                                                                   select order_product_tb.AgentOrderStatusId).Count())
                           < all.Sum(obj => obj.order_product.QTY * obj.inventory.Price)

                    select new
                    {
                        customername = all.Key.FirstName + ' ' + all.Key.LastName,
                        agentCustomerId = all.Key.AgentCustomerId,
                        agentOrderStatusId = all.Key.Id,

                        amountPaid = all.Sum(obj => obj.customer_orderpayment.AmountPaid) / ((from order_product_tb in _context.OrderProducts
                                                                                              where order_product_tb.AgentOrderStatusId == all.Key.Id

                                                                                              select order_product_tb.AgentOrderStatusId).Count()),

                        totalPayment = all.Sum(obj => obj.order_product.QTY * obj.inventory.Price),
                        orderDate = all.Key.OrderDate


                    }).ToList();

                return Ok(new { CustomerOrderOutstandingBalance = "GetCustomersOutstandingBalanceSuccess", customersOutstandingBalList = customerwith_OutBillance });
            }
            catch(Exception ex)
            {
                return Ok(new { CustomerOrderOutstandingBalance =ex.Message });
            }
         
            //  return await _context.CustomerOrderPayment.ToListAsync();
        }

        // GET: api/CustomerOrderPayments/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<CustomerOrderPayment>> GetCustomerOrderPayment(int id)
        //{
        //    var customerOrderPayment = await _context.CustomerOrderPayment.FindAsync(id);

        //    if (customerOrderPayment == null)
        //    {
        //        return NotFound();
        //    }

        //    return customerOrderPayment;
        //}

        // PUT: api/CustomerOrderPayments/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
      //  [HttpPut("{id}")]  
      //order payment of outstanding balance
        //param customerId and list of agentorderstatusId
        //if first order payment complete then payment will be adjusted for second amount
        [HttpPut]
        public async Task<IActionResult> PutCustomerOrderPayment(UpdateOutstandingBalance_View outstandingbalnceView)
        {

            int payment = outstandingbalnceView.orderPaymentList[0].AmountPaid;
            foreach (CustomerOrderPayment orderPayment in outstandingbalnceView.orderPaymentList)
            {
                CustomerOrderPayment orderPaymentBeingUpdate = _context.CustomerOrderPayment.Where(obj => obj.AgentOrderStatusId == orderPayment.AgentOrderStatusId).FirstOrDefault();

                int remainingBalancetoPay = comparewithRemainingBalance(orderPayment.AgentOrderStatusId);
                if (remainingBalancetoPay >= payment)
                {
                    orderPaymentBeingUpdate.AmountPaid += payment;
                    _context.CustomerOrderPayment.Update(orderPaymentBeingUpdate);
                    _context.SaveChanges();
                    break;
                }
                else
                {
                    orderPaymentBeingUpdate.AmountPaid += remainingBalancetoPay;
                    payment -= remainingBalancetoPay;
                    _context.CustomerOrderPayment.Update(orderPaymentBeingUpdate);
                    _context.SaveChanges();
                }

            }

            return Ok(new { CustomerOrderOutstandingBalance = "updateOutstandingBalanceSuccess" });
        }

   public  int  comparewithRemainingBalance(int agentOrderStatusId)
        {

            int remaining_OutBillance = (
               from agent_customer in _context.AgentCustomer
               join agent_order_status in _context.AgentOrderStatus on agent_customer.Id equals agent_order_status.AgentCustomerId
               where agent_order_status.Id==agentOrderStatusId
               join order_product in _context.OrderProducts on agent_order_status.Id equals order_product.AgentOrderStatusId
               join inventory in _context.Inventory on order_product.InventoryId equals inventory.Id
               join customer_orderpayment in _context.CustomerOrderPayment on agent_order_status.Id equals
               customer_orderpayment.AgentOrderStatusId
               group new
               {
                   agent_order_status,order_product,inventory,customer_orderpayment
               } by new
               {
                   
                   agent_order_status.Id,
                   agent_order_status.AgentCustomerId,
                 

               } into all
               where all.Sum(obj => obj.customer_orderpayment.AmountPaid) / ((from order_product_tb in _context.OrderProducts
                                                                              where order_product_tb.AgentOrderStatusId == all.Key.Id
                                                                              select order_product_tb.AgentOrderStatusId).Count())
                      < all.Sum(obj => obj.order_product.QTY * obj.inventory.Price)
                     

               select new
               {
                 amounttoPaid=(all.Sum(obj => obj.order_product.QTY * obj.inventory.Price)-
                   (all.Sum(obj => obj.customer_orderpayment.AmountPaid) / ((from order_product_tb in _context.OrderProducts
                                                                             where order_product_tb.AgentOrderStatusId == all.Key.Id

                                                                             select order_product_tb.AgentOrderStatusId).Count()))
                   )

                    // paidAmount=all.as
                }).FirstOrDefault().amounttoPaid;

            return remaining_OutBillance;

        }
        // POST: api/CustomerOrderPayments
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.

        [HttpPost]  //order payment of specific order after delivery
        public async Task<ActionResult<CustomerOrderPayment>> PostCustomerOrderPayment(CustomerOrderPayment customerOrderPayment)
        {
            _context.CustomerOrderPayment.Add(customerOrderPayment);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerOrderPaymentExists(customerOrderPayment.AgentOrderStatusId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new { CustomerOrderPayment = "PaymentSuccess" });
            //return CreatedAtAction("GetCustomerOrderPayment", new { id = customerOrderPayment.AgentOrderStatusId }, customerOrderPayment);
        }

        // DELETE: api/CustomerOrderPayments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomerOrderPayment>> DeleteCustomerOrderPayment(int id)
        {
            var customerOrderPayment = await _context.CustomerOrderPayment.FindAsync(id);
            if (customerOrderPayment == null)
            {
                return NotFound();
            }

            _context.CustomerOrderPayment.Remove(customerOrderPayment);
            await _context.SaveChangesAsync();

            return customerOrderPayment;
        }

        private bool CustomerOrderPaymentExists(int id)
        {
            return _context.CustomerOrderPayment.Any(e => e.AgentOrderStatusId == id);
        }
    }
}
