namespace TaskManagementApi.task
{
    public record TaskDTO(
        int Id,
        string Title,
        string Description,
        TaskStatus Status,
        DateTime DueDate
    );
}
