using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stardewmodmaker_app.Data;
using stardewmodmaker_app.Models;

namespace stardewmodmaker_app.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DialogueLinesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DialogueLinesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DialogueLines
        /*Not Required for Client
         * 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DialogueLine>>> GetDialogueLine()
        {
            return await _context.DialogueLine.ToListAsync();
        }*/

        // GET: api/DialogueLines/5
        /* Not Required For Client
         * 
        [HttpGet("{id}")]
        public async Task<ActionResult<DialogueLine>> GetDialogueLine(int id)
        {
            var dialogueLine = await _context.DialogueLine.FindAsync(id);

            if (dialogueLine == null)
            {
                return NotFound();
            }

            return dialogueLine;
        } */

        // PUT: api/DialogueLines/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<DialogueLine>> PutDialogueLine(int id, DialogueLine dialogueLine)
        {
            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                //Check to see if request is valid
                if (id != dialogueLine.id)
                {
                    return BadRequest();
                }

                //Check to see if user owns the object
                var existingLine = await _context.DialogueLine.FindAsync(id);
                if (existingLine.ownerId != userId)
                {
                    return Unauthorized();
                }

                _context.Entry(dialogueLine).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DialogueLineExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return dialogueLine;
            }
            return Unauthorized();
        }

        // POST: api/DialogueLines
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DialogueLine>> PostDialogueLine([FromBody] JsonElement data)//int id, DialogueLine dialogueLine)
        {
            int id = data.GetProperty("id").GetInt32();
            DialogueLine dialogueLine = data.GetProperty("dialogueLine").ToObject<DialogueLine>();

            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                //var dialogueEntry = _context.Set<DialogueEntry>().Local.FirstOrDefault(x=>x.id==id);
                var dialogueEntry = await _context.DialogueEntry.FindAsync(id);

                if (dialogueEntry == null)
                {
                    return BadRequest();
                }
                if( dialogueEntry.ownerId != userId)
                {
                    return BadRequest();
                }
                //_context.Entry(dialogueEntry).State = EntityState.Detached;

                dialogueLine.ownerId = userId;
                dialogueLine.DialogueEntry = dialogueEntry;

                //dialogueEntry.DialogueLines.Add(dialogueLine);

                //_context.Entry(dialogueEntry).State = EntityState.Modified;

                _context.DialogueLine.Add(dialogueLine);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDialogueLine", new { id = dialogueLine.id }, dialogueLine);
            }
            return Unauthorized();
        }

        // DELETE: api/DialogueLines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DialogueLine>> DeleteDialogueLine(int id)
        {
            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;


                var dialogueLine = await _context.DialogueLine.FindAsync(id);
                if (dialogueLine == null)
                {
                    return NotFound();
                }
                //Simply return not found to not alert that any difference between not exist and not authorized.
                if (dialogueLine.ownerId != userId)
                {
                    return NotFound();
                }

                _context.DialogueLine.Remove(dialogueLine);
                await _context.SaveChangesAsync();

                return dialogueLine;
            }
            return Unauthorized();
        }

        private bool DialogueLineExists(int id)
        {
            return _context.DialogueLine.Any(e => e.id == id);
        }


    }
}
