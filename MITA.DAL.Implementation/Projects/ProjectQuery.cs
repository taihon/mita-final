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
    public class ProjectQuery : IProjectQuery
    {
        private readonly TasksContext _context;

        public ProjectQuery(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectResponse> RunAsync(int projectId)
        {
            Project project = await _context.Projects.FindAsync(projectId);
            if(project == null)
            {
                return null;
            }
            //TODO: add automapper
            return new ProjectResponse
            {
                Id = project.Id,
                Description = project.Description,
                Title = project.Title,
                Archived = project.Archived
            };
        }
    }
}
