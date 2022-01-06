using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    [Table("Products",Schema ="dbo")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column(TypeName ="varchar(60)")]
        public string? Name { get; set; }

        [Required]
        [Column(TypeName ="varchar(100)")]
        public string? Description { get; set; }

        public  ICollection<ProductDetail>? ProductDetails {get; set;}
    }
}