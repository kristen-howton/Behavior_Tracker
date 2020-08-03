using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BehaviorReport.Data;
using BehaviorReport.Models;
using BehaviorReport.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BehaviorReport.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BehaviorController : ControllerBase
    {
        private readonly BehaviorRepository _behaviorRepository;

        private readonly UserProfileRepository _userProfileRepository;


        //using context instead of config
        public BehaviorController(ApplicationDbContext context)
        {
            _behaviorRepository = new BehaviorRepository(context);
            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetBehavior(int id)
        {
            return Ok(_behaviorRepository.GetBehaviorById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_behaviorRepository.GetAllBehaviors());
        }

        [HttpGet("bylearner/{id}")]
        public IActionResult GetByLearner(int id)
        {
            return Ok(_behaviorRepository.GetAllBehaviorsByLearner(id));
        }

        [HttpPost]
        public IActionResult Behavior(Behavior behavior)
        {
            _behaviorRepository.Add(behavior);
            return CreatedAtAction(nameof(Get), new { id = behavior.Id }, behavior);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Behavior behavior)
        {
            if (id != behavior.Id)
            {
                return BadRequest();
            }

            _behaviorRepository.Update(behavior);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _behaviorRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
