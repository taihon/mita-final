using System;
using System.Collections.Generic;

namespace MITA.ViewModels.Tasks
{
    public class ProjectTaskResponse
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public ICollection<ProjectTaskResponse> Childrens { get; set; }
        public string Title { get; set; }
        public DateTime DueDate { get; set; }
        public TaskPriority Priority { get; set; }
        public bool Completed { get; set; }
    }
}