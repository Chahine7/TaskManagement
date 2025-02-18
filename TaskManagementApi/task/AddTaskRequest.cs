namespace TaskManagementApi.task
{
    public record AddTaskRequest(
        string Title,
        string Description,
        DateTime DueDate
    );
}
