using BehaviorReport.Data;
using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class BehaviorRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public BehaviorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Behavior GetBehaviorById(int id)
        {
            return _context.Behavior
                            .Where(b => !b.IsDeleted)
                            .FirstOrDefault(b => b.Id == id);
        }

        public List<Behavior> GetAllBehaviors(int id)
        {
            return _context.Behavior
                            .Where(b => !b.IsDeleted)
                            .Include(b => b.Learner)
                            .Where(b => b.Learner.UserProfileId == id && !b.Learner.IsDeleted)
                            .OrderBy(b => b.Learner)
                            .ToList();
        }

        public List<Behavior> GetAllBehaviorsByLearner(int id)
        {
            return _context.Behavior
                            .Include(b => b.Learner)
                            .Where(b => !b.IsDeleted)
                            .Where(b => b.LearnerId == id)
                            .OrderBy(b => b.Learner)
                            .ToList();
        }

        public void Add(Behavior behavior)
        {
            _context.Add(behavior);
            _context.SaveChanges();
        }

        public void Update(Behavior behavior)
        {
            _context.Entry(behavior).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var behavior = GetBehaviorById(id);
            behavior.IsDeleted = true;
            _context.Entry(behavior).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}
