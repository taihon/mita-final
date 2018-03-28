using MITA.DAL.Projects;
using MITA.DB;
using MITA.Entities;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class UpdateProjectCommand : IUpdateProjectCommand
    {
        private readonly TasksContext _context;

        public UpdateProjectCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectResponse> ExecuteAsync(UpdateProjectRequest request)
        {
            Project foundProject = await _context.Projects.FindAsync(request.Id);
            //TODO: check if user is owner of project before editing it
            //TODO: check if project not archived
            //TODO: add automapper
            if (foundProject != null)
            {
                foundProject.Title = request.Title;
                foundProject.Description = request.Description;
                await _context.SaveChangesAsync();
            }
            return foundProject ==null
                ? null
                : new ProjectResponse
                {
                    Title = foundProject.Title,
                    Description = foundProject.Description,
                    Id = foundProject.Id,
                    Archived = foundProject.Archived
                };
        }
    }
}
