using Microsoft.EntityFrameworkCore;

namespace backend.models
{
    public class ProductCatalogDbContext : DbContext
    {
        public ProductCatalogDbContext(DbContextOptions<ProductCatalogDbContext> options): base(options)
        {

        }
        public DbSet<Product> Products {get; set;}
        public DbSet<Color> Colors {get; set;}
        public DbSet<ProductDetail> ProductDetails {get; set;}

    }
}