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
    }
}