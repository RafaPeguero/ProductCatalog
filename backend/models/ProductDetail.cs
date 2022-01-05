using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    [Table("ProductDetail", Schema = "dbo")]
    public class ProductDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }

        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [ForeignKey("Colors")]
        public int ColorId { get; set; }

        [Required]
        [Column(TypeName = "decimal(12,2)")]
        public decimal Price { get; set; }

        public Product Product { get; set; }
        public Color Color { get; set; }


    }
}