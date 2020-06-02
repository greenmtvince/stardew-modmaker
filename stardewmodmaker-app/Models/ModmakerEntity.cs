using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace stardewmodmaker_app.Models
{
    public class ModmakerEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int id { get; set; }
        public string ownerId { get; set; }
        public string modId { get; set; }
    }
}
