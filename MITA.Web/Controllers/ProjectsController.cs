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
        public async Task<IActionResult> GetProjectsListAsync([FromServices]IProjectsListQuery query)
        {
            ListResponse<ProjectResponse> response = await query.RunAsync();
            return Ok(response);
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
            ProjectResponse response = await query.RunAsync(projectId);
            return response == null ? (IActionResult)NotFound() : Ok(response);
        }
    }
}