using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.ViewModels.Tasks
{
    public class ImportTaskRequest
    {
        public string Title { get; set; }
        public DateTime? DueDate { get; set; }
        public ICollection<ImportTaskRequest> Childs { get; set; }
    }
}
