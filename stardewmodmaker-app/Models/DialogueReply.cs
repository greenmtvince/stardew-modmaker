using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace stardewmodmaker_app.Models
{
    public class DialogueReply : ModmakerEntity
    {
        public int responseId { get; set; }
        public string text { get; set; }
        public short friendshipBonus { get; set; }

        [JsonIgnore]
        [ForeignKey("dialogue_line_ref")]
        public virtual DialogueLine DialogueLine { get; set; }
    }
}
