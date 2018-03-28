using MITA.DAL.Tasks;
using MITA.DB;
using MITA.Entities;
using MITA.ViewModels.Tasks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Tasks
{
    public class CreateTaskCommand : ICreateTaskCommand
    {
        private readonly TasksContext _context;

        public CreateTaskCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectTaskResponse> ExecuteAsync(CreateTaskRequest request)
        {
            var task = new ProjectTask
            {
                ParentId = request.ParentId,
                ProjectId = (int)request.ProjectId, //dirty code
                Priority = (Entities.TaskPriority)request.Priority,
                Title = request.Title,
                DueDate = request.DueDate
            };
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            if (request.ParentId.HasValue)
            {
                var parent = await _context.Tasks.FindAsync(request.ParentId.Value);
                if (parent != null)
                {
                    parent.Childrens.Add(task);
                }
            }
            //TODO: add automapper
            return new ProjectTaskResponse
            {
                DueDate = task.DueDate,
                Id = task.Id,
                ParentId = task.ParentId,
                Priority = (ViewModels.Tasks.TaskPriority)task.Priority,
                Title = task.Title
            };
        }
    }
}
