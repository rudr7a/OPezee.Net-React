using Microsoft.EntityFrameworkCore;
using OpezeeApi.Models;
using System.Collections.Generic;

namespace OpezeeApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
    }
}
