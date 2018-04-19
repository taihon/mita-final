using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MITA.DAL.Todoist;
using MITA.ViewModels.Todoist;

namespace MITA.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Todoist")]
    [Authorize]
    public class TodoistController : Controller
    {
        [Route("gettoken")]
        [ProducesResponseType(200,Type =typeof(TodoistTokenResponse))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetToken([FromBody]TodoistTokenRequest request,[FromServices]ITodoistTokenQuery query)
        {
            TodoistTokenResponse result = await query.RunAsync(request.Code);
            return string.IsNullOrWhiteSpace(result.Error)
                ? (IActionResult)Ok(result)
                : BadRequest(result);
        }
        //public async Task<IActionResult> ImportProject([FromBody]TodoistProject project, [FromServices]IImportTodoistProjectCommand command)
        //{
        //    var result = await command.ExecuteAsync(project);
        //    return Ok(result);
        //}
    }
}