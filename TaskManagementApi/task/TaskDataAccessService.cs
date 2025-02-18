using Microsoft.EntityFrameworkCore;
using TaskManagementApi.data;

namespace TaskManagementApi.task
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskManagementDbContext _context;

        public TaskRepository(TaskManagementDbContext context)
        {
            _context = context;
        }

      
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync(string id)
        {
            return await _context.Tasks.Where(t => t.User.Id == id).ToListAsync();
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        }

      public async Task<TaskItem> AddTaskAsync(TaskItem task)
        {
            var result = await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

    
        public async Task<TaskItem> UpdateTaskAsync(TaskItem task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }

       public async Task<TaskItem?> DeleteTaskAsync(int id)
{
    var task = await _context.Tasks.FindAsync(id);

    if (task == null) return null;  

    _context.Tasks.Remove(task);  
    await _context.SaveChangesAsync();  

    return task;
}
    }
}