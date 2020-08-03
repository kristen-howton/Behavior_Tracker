using BehaviorReport.Data;
using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Repositories
{
    public class ReportRepository
    {
        private readonly Data.ApplicationDbContext _context;
        public ReportRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Report GetReportById(int id)
        {
            return _context.Report
                            .Include(r => r.Learner)
                            .Include(r => r.Consequence)
                            .Include(r => r.Activity)
                            .Include(r => r.Behavior)
                            .FirstOrDefault(r => r.Id == id);
        }
        public List<Report> GetAllReports()
        {
            return _context.Report
                            .Include(r => r.Learner)
                            .Include(r => r.Consequence)
                            .Include(r => r.Activity)
                            .Include(r => r.Behavior)
                            .Include(r => r.PromptLevel)
                            .ToList();
        }

        public List<Report> GetReportByLearner(int id)
        {
            return _context.Report
                            .Include(r => r.Learner)
                            .Include(r => r.Consequence)
                            .Include(r => r.Activity)
                            .Include(r => r.Behavior)
                            .Include(r => r.PromptLevel)
                            .Where(r => r.LearnerId == id)
                            .ToList();
        }
        public void Add(Report report)
        {
            _context.Add(report);
            _context.SaveChanges();
        }

        public void Update(Report report)
        {
            _context.Entry(report).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var report = GetReportById(id);
            _context.Report.Remove(report);
            _context.SaveChanges();
        }
    }
}

