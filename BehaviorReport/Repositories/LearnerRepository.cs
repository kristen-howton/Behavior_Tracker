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
                            .FirstOrDefault(l => l.Id == id);
        }
        public List<Learner> GetAllLeaners()
        {
            return _context.Learner
                            .Include(l => l.UserProfile)
                            .ToList();
        }
        public List<Learner> GetLearnerByUserProfile(int id)
        {
            return _context.Learner
                            .Include(l => l.UserProfile)
                            .Where(l => l.UserProfileId == id)
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
            _context.Learner.Remove(learner);
            _context.SaveChanges();
        }
    }
}
