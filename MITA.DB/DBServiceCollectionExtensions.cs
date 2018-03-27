using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MITA.DB
{
    public static class DBServiceCollectionExtensions
    {
        public static IServiceCollection AddTasksDB(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TasksContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            return services;
        }
    }
}
