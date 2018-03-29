using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Projects
{
    public interface IRestoreProjectCommand
    {
        Task<bool> ExecuteAsync(int projectId);
    }
}
