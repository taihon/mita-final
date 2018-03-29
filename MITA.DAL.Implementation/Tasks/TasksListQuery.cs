using Microsoft.EntityFrameworkCore;
using MITA.DAL.Tasks;
using MITA.DB;
using MITA.Entities;
using MITA.ViewModels;
using MITA.ViewModels.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Tasks
{
    public class TasksListQuery : ITasksListQuery
    {
        private readonly TasksContext _context;

        public TasksListQuery(TasksContext context)
        {
            _context = context;
        }
        public async Task<ListResponse<ProjectTaskResponse>> RunAsync(int projectId)
        {
            var items = await loadTasksTree(projectId, null);
            return new ListResponse<ProjectTaskResponse>
            {
                Items = items,
                TotalItemsCount = items.Count,
                PageSize = 25
            };
        }
        private async Task<List<ProjectTaskResponse>> loadTasksTree(int projectId, int? parentId)
        {
            List<ProjectTaskResponse> tasks = await _context.Tasks
                .Where(t=>t.ProjectId == projectId && t.ParentId == parentId)
                .Select(pt=>new ProjectTaskResponse {
                    Id=pt.Id,
                    Title = pt.Title,
                    Priority = (ViewModels.Tasks.TaskPriority)pt.Priority,
                    DueDate = pt.DueDate,
                    Completed = pt.Completed,
                    ParentId = pt.ParentId
                })
                .ToListAsync();
            foreach(var sub in tasks)
            {
                sub.Childrens = await loadTasksTree(projectId, sub.Id);
            }
            return tasks;
        }
    }
}
