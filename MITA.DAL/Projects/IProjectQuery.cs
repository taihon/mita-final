using MITA.ViewModels.Projects;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface IProjectQuery
    {
        Task<ProjectResponse> RunAsync(int projectId);
    }
}