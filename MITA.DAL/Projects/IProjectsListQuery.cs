using System;
using System.Threading.Tasks;
using MITA.ViewModels;
using MITA.ViewModels.Projects;

namespace MITA.DAL.Projects
{
    public interface IProjectsListQuery
    {
        Task<ListResponse<ProjectResponse>> RunAsync();
    }
}