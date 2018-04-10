using Microsoft.Extensions.Configuration;
using MITA.DAL.Todoist;
using MITA.ViewModels.Todoist;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MITA.DAL.Implementation.Todoist
{
    public class TodoistTokenQuery:ITodoistTokenQuery
    {
        private IConfiguration _configuration;
        public TodoistTokenQuery(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TodoistTokenResponse> RunAsync(string code)
        {
            var request = new
            {
                client_id = _configuration["TodoistClientId"],
                client_secret = _configuration["TodoistClientSecret"],
                code
            };
            var client = new HttpClient();
            var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://todoist.com/oauth/access_token", content);
            var result = await response.Content.ReadAsStringAsync();
            TodoistTokenResponse typedResponse = JsonConvert.DeserializeObject<TodoistTokenResponse>(result, new JsonSerializerSettings {
                ContractResolver = new SnakeCasePropertyNamesContractResolver()
            });
            return typedResponse;
;
        }

    }
}
