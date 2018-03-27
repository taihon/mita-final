using Microsoft.EntityFrameworkCore;
using MITA.DAL.Projects;
using MITA.DB;
using MITA.ViewModels;
using MITA.ViewModels.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Projects
{
    public class ProjectsListQuery : IProjectsListQuery
    {
        private readonly TasksContext _context;

        public ProjectsListQuery(TasksContext context)
        {
            _context = context;
        }
        public async Task<ListResponse<ProjectResponse>> RunAsync()
        {
            var projects = _context.Projects.Select(p => new ProjectResponse { Description = p.Description, Id = p.Id, Title = p.Title }); //leakage of EFCore into DAL project
            var projectCount = await projects.CountAsync();
            return new ListResponse<ProjectResponse> { Items = await projects.ToListAsync(), Page = 1, PageSize = -1, TotalItemsCount = projectCount };
        }
    }
}
