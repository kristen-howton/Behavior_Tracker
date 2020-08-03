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
    public class ConsequenceController : ControllerBase
    {
        private readonly ConsequenceRepository _consequenceRepository;

        //using context instead of config
        public ConsequenceController(ApplicationDbContext context)
        {
            _consequenceRepository = new ConsequenceRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult GetConsequence(int id)
        {
            return Ok(_consequenceRepository.GetConsequenceById(id));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_consequenceRepository.GetAllConsequences());
        }
    }
}

