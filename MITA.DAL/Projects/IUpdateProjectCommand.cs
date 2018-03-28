using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface IUpdateProjectCommand
    {
        Task<ProjectResponse> ExecuteAsync(UpdateProjectRequest request);
    }
}
