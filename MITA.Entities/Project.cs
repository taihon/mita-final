using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MITA.Entities
{
    public class Project
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Title { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
        public List<ProjecTask> MyProperty { get; set; }
        public Guid OwnerId { get; set; }
        public bool Archived { get; set; }
    }
}
