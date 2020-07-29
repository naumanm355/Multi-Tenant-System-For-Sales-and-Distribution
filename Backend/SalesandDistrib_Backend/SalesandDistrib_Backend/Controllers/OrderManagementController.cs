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
    public class OrderManagementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderManagementController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderManagement
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProducts>>> GetOrderProducts()
        {
            return await _context.OrderProducts.ToListAsync();
        }

        // GET: api/OrderManagement/5
        [HttpGet("{agentCustomerId}")]  //get order of customer
        //   [Route("GetBookingDetail")]
        public async Task<ActionResult<OrderProducts>> GetCustomer_AllOrders(int agentCustomerId)
        {

            var data = (from order_product in _context.OrderProducts
                        join agent_OrderStatus in _context.AgentOrderStatus on order_product.AgentOrderStatusId equals agent_OrderStatus.Id
                        where agent_OrderStatus.AgentCustomerId == agentCustomerId join inventory in _context.Inventory on 
                        order_product.InventoryId equals inventory.Id
                        group new { order_product, inventory } by new
                        { order_product.AgentOrderStatusId, order_product.OrderDate } into orderobject
                        select new
                        {
                            orderDate = orderobject.Key.OrderDate,
                            agentOrderStatusId = orderobject.Key.AgentOrderStatusId,
                            subTotal = orderobject.Sum(obj => obj.order_product.QTY*obj.inventory.Price),
                            totalItems = orderobject.Count(),
                            status = (from ordertype in _context.OrderStatusType
                                      join agent_order_status in _context.AgentOrderStatus on ordertype.Id equals
                                      agent_order_status.OrderStatusId
                                      where agent_order_status.Id == orderobject.Key.AgentOrderStatusId
                                      join targettype in _context.TargetStatusType on
                                      agent_order_status.AgentTargetStatusId equals targettype.Id
                                      where agent_order_status.AgentCustomerId == agentCustomerId
                                      select new
                                      {
                                          targetstatus = targettype.Type,
                                          orderstatus = ordertype.OrderStatus
                                      }).FirstOrDefault()

                        }).ToList();
            return Ok(new { getOrderDetailStatus = "GetSuccess", orderdetailList = data });
            //    return orderProducts;
        }

        [HttpPost]
        [Route("deliveredOrderDetail")]
        public async Task<ActionResult<OrderProducts>> deliverOrder(OrderProducts orderproduct)
        {
            var data = (from order_product in _context.OrderProducts
                        join inventory in _context.Inventory on order_product.InventoryId
equals inventory.Id
                        join products in _context.Products on inventory.ProductId equals products.Id
                        where order_product.AgentOrderStatusId == orderproduct.AgentOrderStatusId
                        select new
                        {
                            name = products.Name,
                            category = products.Category,
                            company = products.Company,
                            inv_price = inventory.Price,
                            qty = order_product.QTY,
                            availableInventoryQty = inventory.TotalPacket_Cartoon,
                            orderproductId = order_product.Id,
                            inventoryId = inventory.Id
                        }).ToList();
            return Ok(new { GetOrderDetailStatus = "GetSuccess", orderDetailList = data });


            //    return orderProducts;
        }

        [HttpPost]
        [Route("getBookedOrderDetail")]
        public async Task<ActionResult<OrderProducts>> bookedOrderdetail(OrderProducts agentOrderStatusId)
        {
            var data = (from //agent_orderstatus in _context.AgentOrderStatus join 
                       order_product in _context.OrderProducts //on agent_orderstatus.Id equals order_product.AgentOrderStatusId
                        join inventory in _context.Inventory on order_product.InventoryId
equals inventory.Id
                        where order_product.AgentOrderStatusId == agentOrderStatusId.AgentOrderStatusId
                        join products in _context.Products on inventory.ProductId equals products.Id
                        //join targettype in _context.TargetStatusType on agent_orderstatus.AgentTargetStatusId equals targettype.Id
                        //where targettype.Id==1
                        //join ordertype in _context.OrderStatusType on agent_orderstatus.OrderStatusId equals ordertype.Id
                        //where ordertype.Id == 2
                        select new
                        {
                            name = products.Name,
                            category = products.Category,
                            company = products.Company,
                            inv_price = inventory.Price,
                            qty = order_product.QTY

                        }).ToList();
            return Ok(new { GetBookedOrderStatus = "GetSuccess", customerorderList = data });


            //    return orderProducts;
        }



        // PUT: api/OrderManagement/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{agentOrderStatusId}")] //for delivery of order
                                          // [Route("UpdateOrderStatus")]
        public async Task<IActionResult> PutOrderProducts(int agentOrderStatusId)
        {
            AgentOrderStatus agentOrderStatus = _context.AgentOrderStatus.Find(agentOrderStatusId);

            agentOrderStatus.AgentTargetStatusId = 3;  //productive target status(mean booking->(orderstatus:1)  success)
            _context.AgentOrderStatus.Update(agentOrderStatus);
            await _context.SaveChangesAsync();
            return Ok(new { OrderDeliverStatus = "DeliverSuccess" });
        }

        // POST: api/OrderManagement
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("placeOrder")]
        public async Task<ActionResult<CartProductView>> PostOrderProducts([FromBody]  PlaceOrderView orderProductsList)
        {
            string status = "";
            try
            {
                foreach (CartProductView orderProducts in orderProductsList.ListOrderProduct)
                {
                    Inventory previousInven = _context.Inventory.Find(orderProducts.InventoryId);
                    previousInven.Id = orderProducts.InventoryId;
                    previousInven.TotalPacket_Cartoon -= orderProducts.QTY;
                    _context.Inventory.Update(previousInven);
                    OrderProducts newOrderProduct = new OrderProducts();
                    newOrderProduct.AgentOrderStatusId = orderProducts.AgentOrderStatusId;
                    newOrderProduct.InventoryId = orderProducts.InventoryId;
                    newOrderProduct.OrderDate = System.DateTime.Parse(orderProducts.OrderDate);
                    newOrderProduct.QTY = orderProducts.QTY;
                    _context.OrderProducts.Add(newOrderProduct);
                    await _context.SaveChangesAsync();
                }
                AgentOrderStatus agentOrderStatus = _context.AgentOrderStatus.Find(orderProductsList.ListOrderProduct[0].AgentOrderStatusId);
                 agentOrderStatus.AgentTargetStatusId = 3;  //productive target status(mean booking->(orderstatus:1)  success)
                _context.AgentOrderStatus.Update(agentOrderStatus);
                await _context.SaveChangesAsync();

                status = "BookingSuccess";
            }
            catch (Exception ex)
            {
                status = ex.Message;

            }

            // status = ;

            return Ok(new { postCustomerOrder = status });
            //  return CreatedAtAction("GetOrderProducts", new { id = orderProducts.Id }, orderProducts);
        }
        [HttpPost]
        [Route("shopvisitedclaim")]
        public ActionResult postCustomerVisitedClaim([FromBody] AgentCustomerVisitedClaimView agentCustomersVisitedClaims)
        {
            string st = "";
            try
            {
                int claimId = _context.ShopVisitedClaimTypes.Where(obj => obj.ClaimType == agentCustomersVisitedClaims.ClaimType).FirstOrDefault().Id;
                AgentCustomersVisitedClaims new_agentCustomersVisitedClaims = new AgentCustomersVisitedClaims();  //current date is default value of claimdate
                new_agentCustomersVisitedClaims.AgentOrderStatusId = agentCustomersVisitedClaims.AgentOrderStatusId;
                new_agentCustomersVisitedClaims.VisitedClaimTypeId = claimId;
                new_agentCustomersVisitedClaims.ClaimDate = agentCustomersVisitedClaims.ClaimDate;
                _context.AgentCustomersVisitedClaims.Add(new_agentCustomersVisitedClaims);
                _context.SaveChanges();
                st = "SaveSuccess";
            }
            catch (Exception ex)
            {
                st = ex.Message;
            }
            AgentOrderStatus agentOrderStatus = _context.AgentOrderStatus.Find(agentCustomersVisitedClaims.AgentOrderStatusId);
            agentOrderStatus.AgentTargetStatusId = 2;  //productive target status(mean booking->(orderstatus:1)  success)
            _context.AgentOrderStatus.Update(agentOrderStatus);
           _context.SaveChangesAsync();


            return Ok(new { CustomerVisitedClaimStatus = "ClaimSaveSuccess" });
        }

        [Route("returnOrder")]
        public async Task<ActionResult<CartProductView>> updateOrderProducts([FromBody]  PlaceOrderView orderProductsList)
        {
            foreach (CartProductView orderProducts in orderProductsList.ListOrderProduct)
            {


                Inventory previousInven = _context.Inventory.Find(orderProducts.InventoryId);
                previousInven.Id = orderProducts.InventoryId;

                previousInven.TotalPacket_Cartoon += orderProducts.QTY;
                _context.Inventory.Update(previousInven);

                OrderProducts beingUpdate_orderProducts = _context.OrderProducts.Find(orderProducts.Id);
                beingUpdate_orderProducts.Id = orderProducts.Id;
                beingUpdate_orderProducts.QTY -= orderProducts.QTY;
                beingUpdate_orderProducts.OrderDate = System.DateTime.Parse(orderProducts.OrderDate);


                await _context.SaveChangesAsync();
            }
            AgentOrderStatus agentOrderStatus = _context.AgentOrderStatus.Find(orderProductsList.ListOrderProduct[0].AgentOrderStatusId);
            agentOrderStatus.AgentTargetStatusId = 3;
            agentOrderStatus.OrderStatusId = 2;  //productive target status(mean booking->(orderstatus:1)  success)

            _context.AgentOrderStatus.Update(agentOrderStatus);
            await _context.SaveChangesAsync();
            return Ok(new { returnCustomerOrder = "ReturnSuccess" });
            //  return CreatedAtAction("GetOrderProducts", new { id = orderProducts.Id }, orderProducts);
        }

        // DELETE: api/OrderManagement/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderProducts>> DeleteOrderProducts(int id)
        {
            var orderProducts = await _context.OrderProducts.FindAsync(id);
            if (orderProducts == null)
            {
                return NotFound();
            }

            _context.OrderProducts.Remove(orderProducts);
            await _context.SaveChangesAsync();

            return orderProducts;
        }

        private bool OrderProductsExists(int id)
        {
            return _context.OrderProducts.Any(e => e.Id == id);
        }
    }
}
