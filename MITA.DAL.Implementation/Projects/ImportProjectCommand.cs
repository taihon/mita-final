using MITA.DAL.Projects;
using MITA.DB;
using MITA.Entities;
using MITA.ViewModels.Projects;
using MITA.ViewModels.Tasks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class ImportProjectCommand : IImportProjectCommand
    {
        private readonly TasksContext _context;

        public ImportProjectCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectResponse> ExecuteAsync(ImportProjectRequest request, string owner)
        {
            var project = new Project {
                OwnerId = Guid.Parse(owner),
                Title = request.Title,
                Tasks = new List<ProjectTask>(),
                Description = request.Description
            };
            foreach(var t in request.Items)
            {
                project.Tasks.Add(buildTree(t, project));
            }
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return new ProjectResponse { Title = project.Title, Description = project.Description };
        }
        private ProjectTask buildTree(ImportTaskRequest request, Project project)
        {
            var parent = new ProjectTask
            {
                Project = project,
                Childrens = new List<ProjectTask>(),
                Title = request.Title,
                DueDate = request.DueDate.GetValueOrDefault()
            };
            if (request.Childs.Count != 0)
            {
                foreach(var child in request.Childs)
                {
                    parent.Childrens.Add(buildTree(child, project));
                }
            }
            return parent;
        }
    }
}
