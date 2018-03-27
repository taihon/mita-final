using System;
using System.ComponentModel.DataAnnotations;

namespace MITA.Entities
{
    public class ProjecTask
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int? ParentId { get; set; }
        public ProjecTask Parent { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }
        [Required]
        public TaskPriority Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}