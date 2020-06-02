using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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
    public class DialogueEntriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DialogueEntriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DialogueEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DialogueEntry>>> GetDialogueEntry()
        {
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                return await _context.DialogueEntry.Where(x => x.ownerId == userId)
                    .Include(x => x.DialogueLines)
                        .ThenInclude(y => y.questionReplies )
                    .Include(x => x.DialogueLines)
                        .ThenInclude(y => y.dialogueResponses )
                    .ToListAsync();
            }

            return NotFound();
        }

        // GET: api/DialogueEntries/5
        /* Disabled.  No client code requires access to individual Entry
         * 
         * [HttpGet("{id}")]
        public async Task<ActionResult<DialogueEntry>> GetDialogueEntry(int id)
        {
            var dialogueEntry = await _context.DialogueEntry.FindAsync(id);

            if (dialogueEntry == null)
            {
                return NotFound();
            }

            return dialogueEntry;
        }*/

        // PUT: api/DialogueEntries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<DialogueEntry>> PutDialogueEntry(int id, DialogueEntry dialogueEntry)
        {
            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                //Check to see if request is valid
                if (id != dialogueEntry.id)
                {
                    return BadRequest();
                }

                //Check to see if user owns the entry

                var existingEntry = await _context.DialogueEntry.FindAsync(id);
                if (existingEntry.ownerId != userId)
                {
                    return Unauthorized();
                }

                _context.Entry(dialogueEntry).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DialogueEntryExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return dialogueEntry;
            }

            return Unauthorized();
            
        }

        // POST: api/DialogueEntries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DialogueEntry>> PostDialogueEntry(DialogueEntry dialogueEntry)
        {
            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                dialogueEntry.ownerId = userId;

                _context.DialogueEntry.Add(dialogueEntry);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDialogueEntry", new { id = dialogueEntry.id }, dialogueEntry);
            }

            return Unauthorized();
        }

        // DELETE: api/DialogueEntries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DialogueEntry>> DeleteDialogueEntry(int id)
        {
            //Get the User ID
            var userClaims = User.Claims.ToList();

            string userId = "";

            if (userClaims.Count > 0)
            {
                userId = User.Claims.ToList().FirstOrDefault(x => x.Type.Contains("nameidentifier")).Value;

                var dialogueEntry = await _context.DialogueEntry.FindAsync(id);
                if (dialogueEntry == null)
                {
                    return NotFound();
                }
                //Simply return not found to not alert that any difference between not exist and not authorized.
                if (dialogueEntry.ownerId != userId)
                {
                    return NotFound();
                }

                _context.DialogueEntry.Remove(dialogueEntry);
                await _context.SaveChangesAsync();

                return dialogueEntry;
            }

            return Unauthorized();
        }

        private bool DialogueEntryExists(int id)
        {
            return _context.DialogueEntry.Any(e => e.id == id);
        }
    }
}
