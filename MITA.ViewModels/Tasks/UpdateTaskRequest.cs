using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.ViewModels.Tasks
{
    public class UpdateTaskRequest
    {
        public DateTime? DueDate { get; set; }
        public string Title { get; set; }
        public bool? Completed { get; set; }
        public TaskPriority? Priority { get; set; }
    }
}
