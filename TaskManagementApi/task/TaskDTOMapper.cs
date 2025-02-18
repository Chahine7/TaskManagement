namespace TaskManagementApi.task
{
public class TaskDTOMapper
    {
        public TaskDTO Map(TaskItem task)
        {
            return new TaskDTO(
                task.Id,
                task.Title,
                task.Description,
                task.Status,
                task.DueDate
            );
        }
    }
}
