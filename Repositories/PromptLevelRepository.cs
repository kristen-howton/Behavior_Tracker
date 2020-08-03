using BehaviorReport.Data;
using BehaviorReport.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class PromptLevelRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public PromptLevelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public PromptLevel GetPromptLevelById(int id)
        {
            return _context.PromptLevel
                            .FirstOrDefault(pl => pl.Id == id);
        }
        public List<PromptLevel> GetAllPromptLevels()
        {
            return _context.PromptLevel
                            .ToList();
        }

    }
}
