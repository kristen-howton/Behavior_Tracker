using BehaviorReport.Data;
using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class ConsequenceRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public ConsequenceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Consequence GetConsequenceById(int id)
        {
            return _context.Consequence
                            .FirstOrDefault(c => c.Id == id);
        }
        public List<Consequence> GetAllConsequences()
        {
            return _context.Consequence
                            .ToList();
        }

    }
}
