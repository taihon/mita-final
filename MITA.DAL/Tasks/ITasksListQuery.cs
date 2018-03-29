using MITA.ViewModels;
using MITA.ViewModels.Tasks;
using System.Threading.Tasks;

namespace MITA.DAL.Tasks
{
    public interface ITasksListQuery
    {
        Task<ListResponse<ProjectTaskResponse>> RunAsync(int projectId);
    }
}