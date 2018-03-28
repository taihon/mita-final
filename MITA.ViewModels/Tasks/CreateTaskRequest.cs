using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MITA.ViewModels.Tasks
{
    public class CreateTaskRequest
    {
        [Required]
        public int? ProjectId { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public TaskPriority Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}
