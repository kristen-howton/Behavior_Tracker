using BehaviorReport.Data;
using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class LearnerRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public LearnerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public Learner GetLearnerById(int id)
        {
            return _context.Learner
                            .Where(l => !l.IsDeleted)
                            .FirstOrDefault(l => l.Id == id);
        }
        public List<Learner> GetAllLeaners()
        {
            return _context.Learner
                            .Where(l => !l.IsDeleted)
                            .Include(l => l.UserProfile)
                            .OrderBy(l => l.FirstName)
                            .ToList();
        }
        public List<Learner> GetLearnerByUserProfile(int id)
        {
            return _context.Learner
                            .Include(l => l.UserProfile)
                            .Where(l => !l.IsDeleted)
                            .Where(l => l.UserProfileId == id)
                            .OrderBy(l => l.FirstName)
                            .ToList();
        }
        public void Add(Learner learner)
        {
            _context.Add(learner);
            _context.SaveChanges();
        }
        public void Update(Learner learner)
        {
            _context.Entry(learner).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var learner = GetLearnerById(id);
            learner.IsDeleted = true;
            _context.Entry(learner).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
