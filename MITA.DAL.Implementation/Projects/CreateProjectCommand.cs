using MITA.DAL.Projects;
using MITA.DB;
using MITA.Entities;
using MITA.ViewModels;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class CreateProjectCommand : ICreateProjectCommand
    {
        private readonly TasksContext _context;

        public CreateProjectCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectResponse> ExecuteAsync(CreateProjectRequest request, string userId)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description,
                OwnerId = Guid.Parse(userId)
            };
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return new ProjectResponse { Title = project.Title, Description = project.Description, Id = project.Id };
        }
    }
}
