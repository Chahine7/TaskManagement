namespace TaskManagementApi.task
{
    public record UpdateTaskRequest(
        string Title,
        string Description,
        TaskStatus Status,
        DateTime DueDate
    );
}
