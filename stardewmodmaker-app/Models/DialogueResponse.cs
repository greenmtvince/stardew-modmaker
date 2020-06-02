using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace stardewmodmaker_app.Models
{
    public class DialogueResponse : ModmakerEntity
    {
        //followup
        //Determines whether this is used to be a followup dialogue or an immediate response to question
        public bool followup { get; set; } 
        public byte portrait { get; set; }
        public int responseID { get; set; }
        public bool switchGender { get; set; }
        public string textDefault { get; set; }
        public string textFemale { get; set; }
        [JsonIgnore]
        [ForeignKey("dialogue_line_ref")]
        public virtual DialogueLine DialogueLine { get; set; }
    }
}
