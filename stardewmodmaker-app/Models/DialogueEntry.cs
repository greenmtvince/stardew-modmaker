using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace stardewmodmaker_app.Models
{
    public class DialogueEntry : ModmakerEntity
    {
        public string characterName { get; set; }
        public byte conditionsType { get; set; }
        public int day { get; set; }
        [StringLength(3)]
        public string dayOfWeek { get; set; } //Sun, Mon, Tue, Wed, Thu, Fri, Sat
        public string dialogueKey { get; set; }
        public virtual ICollection<DialogueLine> DialogueLines { get; set; }
        public byte genericDayType { get; set; }
        public byte hearts { get; set; }
        public bool isFollowup { get; set; }
        public bool isResponse { get; set; }
        public string location { get; set; }
        public bool rain { get; set; }

        [StringLength(6)]
        public string season { get; set; } //Spring, Summer, Fall, Winter
        public bool showCoordinates { get; set; }
        public bool showDayOfWeek { get; set; }
        public bool showFirstYear { get; set; }
        public bool showRelationship { get; set; }
        public bool showSeason { get; set; }
        public bool showSpouse { get; set; }
        public short specialDialogue { get; set; }
        [StringLength(50)]
        public string spouse { get; set; }
        public short x { get; set; }
        public short y { get; set; }
        public byte year { get; set; }
    }
}
