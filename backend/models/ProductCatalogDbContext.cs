using Microsoft.EntityFrameworkCore;

namespace backend.models
{
    public class ProductCatalogDbContext : DbContext
    {
        public DbSet<Product>? Products {get; set;}
        public DbSet<Color>? Colors {get; set;}
        public DbSet<ProductDetail>? ProductDetails {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DEV_EXTERNO2\\SQLEXPRESS;Database=ProductCatalog;User Id=DEV_EXTERNO2\\ADM;Trusted_Connection=True;");
        }

    }
}