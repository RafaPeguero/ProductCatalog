using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController: ControllerBase
    {
        private readonly ProductCatalogDbContext _context;
        public ProductController(ProductCatalogDbContext context)
        {
            _context = context;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> getProducts()
        {
            return await _context.Products
                                        .Include(p => p.ProductDetails)
                                        .ThenInclude(pd => pd.Color)
                                        .ToListAsync();
            // return await _context.Products.ToListAsync();


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> getProduct(int id)
        {
            var product = await _context.Products.
                                            Include(p => p.ProductDetails)
                                            .ThenInclude(pd => pd.Color)
                                            .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            } 

            return product;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> putProduct(int id, Product product)
        {
           product.Id = id;

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                 await _context.SaveChangesAsync();
            }
            catch 
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> postProduct( Product product)
        {
            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return CreatedAtAction("getProduct", new {id = product.Id}, product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> deleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}