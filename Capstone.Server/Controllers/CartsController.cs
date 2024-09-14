using Capstone.Server.Data;
using Capstone.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]

public class CartsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("my-cart")]
    public async Task<IActionResult> GetMyCart()
    {
        var userIdString = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

        if (int.TryParse(userIdString, out int userId))
        {
            var cart = await _context.Carts
                .Where(c => c.UserId == userId)
                .Select(c => new
                {
                    CartId = c.Id,
                    UserId = c.UserId,
                    Items = c.CartItems.Select(ci => new
                    {
                        ci.Id,
                        ci.CardId,
                        ci.Quantity,
                        Card = new
                        {
                            ci.Card.Name,
                            ci.Card.Price,
                            ci.Card.Condition,
                            ci.Card.ImageUrl,
                            ci.Card.GameCategory
                        }
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound("Carrello non trovato per l'utente con ID " + userId);
            }

            return Ok(cart);
        }

        return BadRequest("ID utente non valido o mancante.");
    }

    [HttpPost("add-to-cart")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto model)
    {
        var userIdString = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

        if (int.TryParse(userIdString, out int userId))
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            var cartItem = new CartItem
            {
                CartId = cart.Id,
                CardId = model.CardId,
                Quantity = model.Quantity
            };
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Carta aggiunta al carrello." });
        }

        return BadRequest(new { message = "ID utente non valido." });
    }

    [HttpDelete("remove-item/{itemId}")]
    public async Task<IActionResult> RemoveItemFromCart(int itemId)
    {
        var userIdString = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

        if (int.TryParse(userIdString, out int userId))
        {
            var cartItem = await _context.CartItems
                .Include(ci => ci.Cart)
                .FirstOrDefaultAsync(ci => ci.Id == itemId && ci.Cart.UserId == userId);

            if (cartItem == null)
            {
                return NotFound(new { message = "Articolo non trovato o non appartiene a questo carrello." });
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Articolo rimosso dal carrello." });
        }

        return BadRequest(new { message = "ID utente non valido o mancante." });
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout()
    {
        var userIdString = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

        if (int.TryParse(userIdString, out int userId))
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Card)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || !cart.CartItems.Any())
            {
                return BadRequest(new { message = "Il carrello è vuoto." });
            }

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = cart.CartItems.Sum(ci => ci.Quantity * ci.Card.Price)
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var cartItem in cart.CartItems)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    CardId = cartItem.CardId,
                    Quantity = cartItem.Quantity,
                    Price = cartItem.Card.Price
                };
                _context.OrderItems.Add(orderItem);
            }

            _context.CartItems.RemoveRange(cart.CartItems);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ordine creato con successo.", orderId = order.Id });
        }

        return BadRequest(new { message = "ID utente non valido o mancante." });
    }
}