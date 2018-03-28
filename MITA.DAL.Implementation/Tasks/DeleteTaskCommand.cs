using Microsoft.EntityFrameworkCore;
using MITA.DAL.Tasks;
using MITA.DB;
using MITA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Tasks
{
    public class DeleteTaskCommand : IDeleteTaskCommand
    {
        private readonly TasksContext _context;

        public DeleteTaskCommand(TasksContext context)
        {
            _context = context;
        }
        public async Task ExecuteAsync(int taskId)
        {
            //TODO: use one query instead of two
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
            {
                await removeTaskWithChildren(task);
                await _context.SaveChangesAsync();
            }
        }
        private async Task removeTaskWithChildren(ProjectTask task)
        {
            //should do better - build up list of ids to remove, then remove them in one query
            var tasks = await _context.Tasks.Where(p => p.ParentId == task.Id).ToListAsync();
            foreach(var ctask in tasks)
            {
                await removeTaskWithChildren(ctask);
            }
            _context.Tasks.Remove(task);
        }
    }
}
