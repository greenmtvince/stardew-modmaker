using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stardewmodmaker_app.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string nickname { get; set; }
        public string nexusModId { get; set; }
    }
}
