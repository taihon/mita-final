using MITA.ViewModels.Tasks;
using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.ViewModels.Projects
{
    public class ImportProjectRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<ImportTaskRequest> Items { get; set; }
    }
}
