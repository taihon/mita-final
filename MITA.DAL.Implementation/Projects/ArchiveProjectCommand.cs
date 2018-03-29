using MITA.DAL.Projects;
using MITA.DB;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class ArchiveProjectCommand : IArchiveProjectCommand
    {
        private readonly TasksContext _context;

        public ArchiveProjectCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task ExecuteAsync(ArchiveProjectRequest request)
        {
            //TODO: check if user allowed to archive this project
            var project = await _context.Projects.FindAsync(request.ProjectId);
            if (project != null && !project.Archived)
            {
                project.Archived = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}
