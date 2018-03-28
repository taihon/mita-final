using MITA.DAL.Projects;
using MITA.DB;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class RestoreProjectCommand : IRestoreProjectCommand
    {
        private readonly TasksContext _context;

        public RestoreProjectCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<bool> ExecuteAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);
            //TODO: check if user is owner of project before trying to restore it from archive
            if (project != null)
            {
                project.Archived = false;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                //project not found
                return false;
            }
        }
    }
}
