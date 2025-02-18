using Microsoft.AspNetCore.Identity;
using TaskManagementApi.Exceptions;

namespace TaskManagementApi.task
{
    public class TaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly TaskDTOMapper _taskDTOMapper;
private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;
        public TaskService(
            ITaskRepository taskRepository, TaskDTOMapper taskDTOMapper,
            IHttpContextAccessor httpContextAccessor,
            UserManager<User> userManager)
        {
            _taskRepository = taskRepository;
            _taskDTOMapper = taskDTOMapper;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public async Task<IEnumerable<TaskDTO>> GetAllTasksAsync()
        {
            User loggedInUser = await GetCurrentUserAsync() ?? 
                throw new ResourceNotFoundException("User not found.");
            var tasks = await _taskRepository.GetAllTasksAsync(loggedInUser.Id);
            
            if (tasks == null || !tasks.Any())
            {
                throw new ResourceNotFoundException("No tasks found.");
            }

            return tasks.Select(_taskDTOMapper.Map);
        }

        public async Task<TaskDTO?> GetTaskByIdAsync(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);
            if (task == null)
            {
                throw new ResourceNotFoundException($"Task with ID {id} not found.");
            }
            User loggedInUser = await GetCurrentUserAsync() ?? 
                throw new ResourceNotFoundException("User not found.");
            if (task.UserId != loggedInUser.Id)
    {
        throw new InsufficientAuthenticationException("You are not authorized to access this task.");
    }
            return _taskDTOMapper.Map(task);
        }

        public async Task<TaskDTO> AddTaskAsync(AddTaskRequest addTaskRequest)
        {
            if (string.IsNullOrWhiteSpace(addTaskRequest.Title))
            {
                throw new RequestValidationException("Task title is required.");
            }

            var task = new TaskItem
            {
                Title = addTaskRequest.Title,
                Description = addTaskRequest.Description,
                Status = TaskStatus.ToDo,
                DueDate = addTaskRequest.DueDate
            };

            User loggedInUser = await GetCurrentUserAsync() ?? 
                throw new ResourceNotFoundException("User not found.");

            task.UserId = loggedInUser.Id;
            var addedTask = await _taskRepository.AddTaskAsync(task);
            return _taskDTOMapper.Map(addedTask);
        }

        public async Task<TaskDTO?> UpdateTaskAsync(int taskId, UpdateTaskRequest request)
        {
            var existingTask = await _taskRepository.GetTaskByIdAsync(taskId) ?? 
            throw new ResourceNotFoundException($"Task with ID {taskId} not found.");

            existingTask.Title = request.Title;
            existingTask.Description = request.Description;
            existingTask.Status = request.Status;
            existingTask.DueDate = request.DueDate;

            await _taskRepository.UpdateTaskAsync(existingTask);
            return _taskDTOMapper.Map(existingTask);
        }

        public async Task<TaskDTO?> DeleteTaskAsync(int taskId)
        {
            var existingTask = await _taskRepository.GetTaskByIdAsync(taskId) ?? 
            throw new ResourceNotFoundException($"Task with ID {taskId} not found.");
            
            await _taskRepository.DeleteTaskAsync(taskId);
            return _taskDTOMapper.Map(existingTask);
        }

        public async Task<User?> GetCurrentUserAsync()
    {
        var principal = _httpContextAccessor.HttpContext?.User;
        
        if (principal?.Identity?.IsAuthenticated == true)
        {
            return await _userManager.GetUserAsync(principal);
        }
        
        return null;
    }
    }
}
