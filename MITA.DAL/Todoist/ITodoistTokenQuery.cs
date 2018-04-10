using MITA.ViewModels.Todoist;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Todoist
{
    public interface ITodoistTokenQuery
    {
        Task<TodoistTokenResponse> RunAsync(string code);
    }
}
