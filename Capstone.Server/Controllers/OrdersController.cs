using Capstone.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Capstone.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("my-orders")]
    public async Task<IActionResult> GetMyOrders()
    {
        var userIdString = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

        if (int.TryParse(userIdString, out int userId))
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Card)
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound(new { message = "Non hai effettuato nessun ordine." });
            }

            return Ok(orders);
        }

        return BadRequest(new { message = "ID utente non valido o mancante." });
    }

    [HttpGet("all-orders")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Card)
            .Include(o => o.User)
            .ToListAsync();


        if (orders == null || !orders.Any())
        {
            return NotFound(new { message = "Nessun ordine trovato." });
        }

        return Ok(orders);
    }

    [HttpPut("update-order-status/{orderId}")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusDto updateOrderStatusDto)
    {
        if (updateOrderStatusDto == null || string.IsNullOrEmpty(updateOrderStatusDto.Status))
        {
            return BadRequest("Invalid status data.");
        }

        var order = await _context.Orders.FindAsync(orderId);
        if (order == null)
        {
            return NotFound("Order not found.");
        }

        order.Status = updateOrderStatusDto.Status;
        await _context.SaveChangesAsync();

        return Ok(order);
    }

    [HttpGet("{orderId}")]
    [Authorize]
    public async Task<IActionResult> GetOrderById(int orderId)
    {
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Card)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        if (order == null)
        {
            return NotFound(new { message = "Ordine non trovato." });
        }

        return Ok(order);
    }
}

