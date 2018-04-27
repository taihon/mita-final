using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MITA.DAL;
using MITA.DAL.Projects;
using MITA.ViewModels;
using MITA.ViewModels.Projects;

namespace MITA.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Projects")]
    [Authorize]
    public class ProjectsController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetProjectsListAsync([FromServices]IProjectsListQuery query, ProjectFilter filter)
        {
            ListResponse<ProjectResponse> response = await query.RunAsync(Guid.Parse(getUserId()), filter);
            return Json(response);
        }
        [HttpPost]
        public async Task<IActionResult> CreateProjectAsync([FromBody]CreateProjectRequest request, [FromServices]ICreateProjectCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
            ProjectResponse response = await command.ExecuteAsync(request,userId);
            return CreatedAtRoute("GetSingleProject", new { projectId = response.Id }, response);
        }
        [HttpGet("{projectId}", Name = "GetSingleProject")]
        [ProducesResponseType(200, Type = typeof(ProjectResponse))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetProjectAsync(int projectId, [FromServices]IProjectQuery query)
        {
            ProjectResponse response = await query.RunAsync(projectId, Guid.Parse(getUserId()));
            return response == null ? (IActionResult)NotFound() : Ok(response);
        }
        [HttpPost]
        [Route("{projectId}/archive")]
        public async Task<IActionResult> ArchiveProjectAsync([FromBody]ArchiveProjectRequest request, [FromServices]IArchiveProjectCommand command)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!request.Confirm)
            {
                return BadRequest($"Cannot archive project with id {request.ProjectId}. Operation requires confirmation");
            }
            await command.ExecuteAsync(request);
            return NoContent();
        }
        [HttpPut]
        [Route("{projectId}")]
        [ProducesResponseType(200, Type =typeof(ProjectResponse))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateProjectAsync([FromBody]UpdateProjectRequest request, [FromServices]IUpdateProjectCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ProjectResponse response = await command.ExecuteAsync(request);
            return response == null ? (IActionResult)NotFound() : Ok(response);
        }
        [HttpPost]
        [ProducesResponseType(404)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [Route("{projectId}/restore")]
        public async Task<IActionResult> RestoreProjectAsync(int projectId, [FromServices]IRestoreProjectCommand command)
        {
            if (projectId == 0)
            {
                return BadRequest("You must provide valid projectId");
            }
            var restorationResult = await command.ExecuteAsync(projectId);
            return restorationResult ? (IActionResult)NoContent() : NotFound();
        }
        [HttpPost]
        [ProducesResponseType(200, Type =typeof(ProjectResponse))]
        [Route("import")]
        public async Task<IActionResult> ImportProject([FromServices]IImportProjectCommand command, [FromBody]ImportProjectRequest request)
        {
            var userId = getUserId();
            ProjectResponse result = await command.ExecuteAsync(request, userId);
            return Ok(result);
        }
        private string getUserId()
        {
            return HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier).Value;
        }
    }
}