using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MITA.ViewModels.Projects
{
    public class UpdateProjectRequest
    {
        [Required]
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
