using MITA.DAL.Tasks;
using MITA.DB;
using MITA.ViewModels.Tasks;
using System;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Tasks
{
    public class UpdateTaskCommand : IUpdateTaskCommand
    {
        private readonly TasksContext _context;

        public UpdateTaskCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task<ProjectTaskResponse> ExecuteAsync(int taskId, UpdateTaskRequest request)
        {
            var foundTask = await _context.Tasks.FindAsync(taskId);
            if (foundTask != null)
            {
                //TODO: check if user is owner of project
                if (request.DueDate.HasValue)
                {
                    if (request.DueDate.Value < DateTime.Now)
                    {
                        //throw exception?
                    }
                    foundTask.DueDate = request.DueDate.Value;
                }
                if (request.Completed.HasValue)
                {
                    foundTask.Completed = request.Completed.Value;
                }
                if (!string.IsNullOrEmpty(request.Title))
                {
                    foundTask.Title = request.Title;
                }
                if (request.Priority.HasValue)
                {
                    foundTask.Priority = (Entities.TaskPriority)request.Priority.Value;
                }
            }
            await _context.SaveChangesAsync();
            //TODO: add automapper
            return foundTask == null ? null : new ProjectTaskResponse
            {
                Title = foundTask.Title,
                Id = foundTask.Id,
                DueDate = foundTask.DueDate,
                Completed = foundTask.Completed,
                ParentId = foundTask.ParentId,
                Priority = (TaskPriority)foundTask.Priority
            };
        }
    }
}
