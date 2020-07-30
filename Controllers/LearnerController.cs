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
    public class LearnerController : ControllerBase
    {
        private readonly LearnerRepository _learnerRepository;

        private readonly UserProfileRepository _userProfileRepository;
        public LearnerController(ApplicationDbContext context)
        {
            _learnerRepository = new LearnerRepository(context);
            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetLearner(int id)
        {
            return Ok(_learnerRepository.GetLearnerById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_learnerRepository.GetAllLeaners());
        }

        [HttpGet("byuser")]
        public IActionResult GetByUserProfile()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_learnerRepository.GetLearnerByUserProfile(currentUserProfile.Id));
        }

        [HttpPost]
        public IActionResult Learner(Learner learner)
        {
            var currentUserProfile = GetCurrentUserProfile();
            learner.UserProfileId = currentUserProfile.Id;
            _learnerRepository.Add(learner);
            return CreatedAtAction(nameof(Get), new { id = learner.Id }, learner);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Learner learner)
        {
            if (id != learner.Id)
            {
                return BadRequest();
            }

            _learnerRepository.Update(learner);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _learnerRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId); 
        }

    }
}
