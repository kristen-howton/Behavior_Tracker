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
using Microsoft.VisualBasic;

namespace BehaviorReport.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ActivityRepository _activityRepository;

        private readonly UserProfileRepository _userProfileRepository;


        //using context instead of config
        public ActivityController(ApplicationDbContext context)
        {
            _activityRepository = new ActivityRepository(context);
            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetActivity(int id)
        {
            return Ok(_activityRepository.GetActivityById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_activityRepository.GetAllActivities());
        }

        [HttpGet("byuser")]
        public IActionResult GetByUserProfile()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_activityRepository.GetActivitiesByUserProfile(currentUserProfile.Id));
        }

        [HttpPost]
        public IActionResult Activity(Activity activity)
        {
            var currentUserProfile = GetCurrentUserProfile();
            activity.UserProfileId = currentUserProfile.Id;
            _activityRepository.Add(activity);
            return CreatedAtAction(nameof(Get), new { id = activity.Id }, activity);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Activity activity)
        {
            var currentUserProfile = GetCurrentUserProfile();
            activity.UserProfileId = currentUserProfile.Id;
            if (id != activity.Id)
            {
                return BadRequest();
            }

            _activityRepository.Update(activity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _activityRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }


}
