using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.task
{

 public class TaskItem
 {
       [Key]
        public int Id { get; set; }           
        public string Title { get; set; }   
        public string Description { get; set; } 
        public TaskStatus Status { get; set; }
        public DateTime DueDate { get; set; }   
        public User User { get; set; }
       public string UserId { get; set; }       
 }
}