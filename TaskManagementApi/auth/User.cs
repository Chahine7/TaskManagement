using Microsoft.AspNetCore.Identity;
using TaskManagementApi.task;

public class User : IdentityUser
{
    public string FullName { get; set; }
    public List<TaskItem> Tasks { get; set; }
    
}
