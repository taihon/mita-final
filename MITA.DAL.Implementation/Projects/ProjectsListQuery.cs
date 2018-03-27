using MITA.DAL.Projects;
using MITA.ViewModels;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class ProjectsListQuery : IProjectsListQuery
    {
        public Task<ListResponse<ProjectResponse>> RunAsync()
        {
            throw new NotImplementedException();
        }
    }
}
