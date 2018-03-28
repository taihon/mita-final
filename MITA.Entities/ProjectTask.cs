using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MITA.Entities
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int? ParentId { get; set; }
        public ProjectTask Parent { get; set; }
        public ICollection<ProjectTask> Childrens { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }
        [Required]
        public TaskPriority Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}