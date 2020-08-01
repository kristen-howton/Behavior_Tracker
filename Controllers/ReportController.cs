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
    public class ReportController : ControllerBase
    {
        private readonly ReportRepository _reportRepository;
        private readonly UserProfileRepository _userProfileRepository;


        //using context instead of config
        public ReportController(ApplicationDbContext context)
        {
            _reportRepository = new ReportRepository(context);

            _userProfileRepository = new UserProfileRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetReport(int id)
        {
            return Ok(_reportRepository.GetReportById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reportRepository.GetAllReports());
        }

        [HttpGet("bylearner/{id}")]
        public IActionResult GetByLearner(int id)
        {
            return Ok(_reportRepository.GetReportByLearner(id));
        }

        [HttpPost]
        public IActionResult Report(Report report)
        {
            var currentUserProfile = GetCurrentUserProfile();
            report.LearnerId = currentUserProfile.Id;
            _reportRepository.Add(report);
            return CreatedAtAction(nameof(Get), new { id = report.Id }, report);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Report report)
        {
            if (id != report.Id)
            {
                return BadRequest();
            }

            _reportRepository.Update(report);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _reportRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
