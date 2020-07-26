using BehaviorReport.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Activity> Activity { get; set; }
        public DbSet<Behavior> Behavior { get; set; }
        public DbSet<Report> Report { get; set; }
        public DbSet<Consequence> Consequence { get; set; }
        public DbSet<Learner> Learner { get; set; }

    }
}
