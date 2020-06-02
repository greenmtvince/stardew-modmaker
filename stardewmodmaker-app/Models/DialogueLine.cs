using IdentityServer4.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;

namespace stardewmodmaker_app.Models
{
    public class DialogueLine : ModmakerEntity
    {
        public virtual ICollection<DialogueResponse> dialogueResponses { get; set; }
        public byte endStyle { get; set; }
        public string firstTimeFemale { get; set; }
        public string firstTimeText { get; set; }
        public string letterId { get; set; }
        public byte order { get; set; }
        public byte portrait { get; set; }
        public virtual ICollection<DialogueReply> questionReplies { get; set; }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public string randomItems { get; set; }
        public bool showFirst { get; set; }
        public bool switchGender { get; set; }
        public string textDefault { get; set; }
        public string textFemale { get; set; }

        //Handle Numeric Array
        //From StackOverflow:
        //https://stackoverflow.com/questions/15220921/how-to-store-double-array-to-database-with-entity-framework-code-first-approac

        [NotMapped]
        public List<int> numericRandomItems
        {
            get
            {
                if (randomItems.IsNullOrEmpty())
                {
                    return new List<int>();
                }
                return Array.ConvertAll(randomItems.Split(','), Int32.Parse).ToList();
            }
            set
            {
                if (!value.IsNullOrEmpty())
                {
                    var _data = value;
                    this.randomItems = String.Join(",", _data.Select(p => p.ToString()).ToArray());
                }
                else
                {
                    this.randomItems = "";
                }

            }
        }
        [JsonIgnore]
        [ForeignKey("dialogue_entry_ref")]
        public virtual DialogueEntry DialogueEntry { get; set; }


    }
}
