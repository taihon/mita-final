using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface IImportProjectCommand
    {
        Task<ProjectResponse> ExecuteAsync(ImportProjectRequest request, string ownerId);
    }
}
