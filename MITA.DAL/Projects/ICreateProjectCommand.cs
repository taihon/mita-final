using MITA.ViewModels;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface ICreateProjectCommand
    {
        Task<ProjectResponse> ExecuteAsync(CreateProjectRequest request, string ownerId);
    }
}
