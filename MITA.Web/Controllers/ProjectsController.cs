using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}