using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MITA.ViewModels.Projects
{
    public class ArchiveProjectRequest
    {
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public bool Confirm { get; set; }
    }
}
