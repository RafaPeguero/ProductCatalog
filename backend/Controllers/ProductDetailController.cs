using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/productsDetails")]
    public class ProductDetailController: ControllerBase
    {
        private readonly ProductCatalogDbContext _context;
        public ProductDetailController(ProductCatalogDbContext context)
        {
            _context = context;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> getProductDetails()
        {
            return await _context.ProductDetails
                                        .Include(p => p.Product)
                                        .Include(pd => pd.Color)
                                        .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetail>> getProductDetail(int id)
        {
            var product = await _context.ProductDetails
                                        .Include(p => p.Product)
                                        .Include(pd => pd.Color)
                                            .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            } 

            return product;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> putProductDetail(int id, ProductDetail productDetail)
        {
           productDetail.Id = id;

            _context.Entry(productDetail).State = EntityState.Modified;

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
        public async Task<ActionResult<Product>> postProductDetail( ProductDetail productDetail)
        {
            _context.ProductDetails.Add(productDetail);

            await _context.SaveChangesAsync();

            return CreatedAtAction("getProductDetail", new {id = productDetail.Id}, productDetail);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductDetail>> deleteProductDetail(int id)
        {
            var product = await _context.ProductDetails.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            _context.ProductDetails.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}