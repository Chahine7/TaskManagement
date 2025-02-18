using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TaskManagementApi.task;
namespace TaskManagementApi.data
{
    public class TaskManagementDbContext : IdentityDbContext<User>
    {
        public TaskManagementDbContext(DbContextOptions<TaskManagementDbContext> options)
            : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
    
    }
    
    
}
