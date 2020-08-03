using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BehaviorReport.Data;
using BehaviorReport.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BehaviorReport.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PromptLevelController : ControllerBase
    {
        private readonly PromptLevelRepository _promptLevelRepository;

        //using context instead of config
        public PromptLevelController(ApplicationDbContext context)
        {
            _promptLevelRepository = new PromptLevelRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetPromptLevel(int id)
        {
            return Ok(_promptLevelRepository.GetPromptLevelById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_promptLevelRepository.GetAllPromptLevels());
        }
    }
}
