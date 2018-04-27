using MITA.ViewModels.Projects;
using System;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface IProjectQuery
    {
        Task<ProjectResponse> RunAsync(int projectId, Guid userId);
    }
}