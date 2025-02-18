using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagementApi.task
{
    [Route("api/v1/[controller]")]
    [ApiController]

    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }
        [HttpGet("{taskId}")]
        public async Task<IActionResult> GetTaskById(int taskId)
        {
            var task = await _taskService.GetTaskByIdAsync(taskId);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        [HttpPost]
        
        public async Task<ActionResult<TaskDTO>> AddTask([FromBody] AddTaskRequest request)
        {
            var task = await _taskService.AddTaskAsync(request);
            return CreatedAtAction(nameof(GetTaskById), new { taskId = task.Id }, task);
        }

        [HttpPut("{taskId}")]
public async Task<IActionResult> UpdateTask(int taskId, UpdateTaskRequest request)
{
    var updatedTask = await _taskService.UpdateTaskAsync(taskId, request);
    if (updatedTask == null) return NotFound();

    return Ok(updatedTask);
}
[HttpDelete("{taskId}")]
public async Task<IActionResult> DeleteTask(int taskId)
{
    var deletedTask = await _taskService.DeleteTaskAsync(taskId);
    return Ok(deletedTask);
}
    }
    
}
