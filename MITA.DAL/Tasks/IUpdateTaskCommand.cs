using MITA.ViewModels.Tasks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Tasks
{
    public interface IUpdateTaskCommand
    {
        Task<ProjectTaskResponse> ExecuteAsync(int taskId,UpdateTaskRequest request);
    }
}
