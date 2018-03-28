using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using MITA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.DB
{
    public class TasksContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> Tasks { get; set; }
        public TasksContext(DbContextOptions options) : base(options)
        {
        }

        protected TasksContext()
        {
        }
    }
}
