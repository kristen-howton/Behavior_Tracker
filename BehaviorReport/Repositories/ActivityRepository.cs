using BehaviorReport.Data;
using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class ActivityRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public ActivityRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Activity GetActivityById(int id)
        {
            return _context.Activity
                            .Where(a => !a.IsDeleted)
                            .FirstOrDefault(a => a.Id == id);
        }
        public List<Activity> GetAllActivities()
        {
            return _context.Activity
                            .Where(a => !a.IsDeleted)
                            .Include(a => a.UserProfile)
                            .ToList();
        }

        public List<Activity> GetActivitiesByUserProfile(int id)
        {
            return _context.Activity
                            .Include(a => a.UserProfile)
                            .Where(a => !a.IsDeleted)
                            .Where(a => a.UserProfileId == id)
                            .ToList();
        }

        public void Add(Activity activity)
        {
            _context.Add(activity);
            _context.SaveChanges();
        }

        public void Update(Activity activity)
        {
            _context.Entry(activity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var activity = GetActivityById(id);
            activity.IsDeleted = true;
            _context.Entry(activity).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
