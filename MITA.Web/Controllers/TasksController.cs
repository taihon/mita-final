using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MITA.DAL.Tasks;
using MITA.Entities;
using MITA.ViewModels;
using MITA.ViewModels.Tasks;

namespace MITA.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/projects/{projectId}/tasks")]
    [Authorize]
    public class TasksController : Controller
    {
        [HttpGet]
        [ProducesResponseType(200,Type = typeof(ListResponse<ProjectTaskResponse>))]
        public async Task<IActionResult> GetTasksListAsync(int projectId, [FromServices]ITasksListQuery query)
        {
            ListResponse<ProjectTaskResponse> response = await query.RunAsync(projectId);
            return Ok(response);
        }
        [HttpPost]
        [ProducesResponseType(200,Type=typeof(ProjectTaskResponse))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateTaskAsync(
            int projectId,
            [FromBody]CreateTaskRequest request,
            [FromServices]ICreateTaskCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //TODO: check if user is owner of project
            var task = await command.ExecuteAsync(request);
            return Ok(task);
        }
        [HttpPut]
        [ProducesResponseType(200, Type = typeof(ProjectTaskResponse))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Route("{taskId}")]
        public async Task<IActionResult> UpdateTaskAsync(int taskId, [FromBody]UpdateTaskRequest request, [FromServices]IUpdateTaskCommand command)
        {
            var response = await command.ExecuteAsync(taskId, request);
            return response == null ? (IActionResult)NotFound() : Ok(response);
        }
    }
}