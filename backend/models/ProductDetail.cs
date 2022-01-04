using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    [Table("ProductDetail",Schema ="dbo")]
    public class ProductDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Products")]
        [Required]
        public int ProductId { get; set; }

        [ForeignKey("Colors")]
        [Required]
        public int ColorId { get; set; }

        [Required]
        [Column(TypeName ="decimal(12,2)")]
        public decimal Price { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Color? Color { get; set; }


    }
}