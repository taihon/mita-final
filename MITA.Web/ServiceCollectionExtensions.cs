using Microsoft.Extensions.DependencyInjection;
using MITA.DAL.Implementation.Projects;
using MITA.DAL.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MITA.Web
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDIImplementations(this IServiceCollection services)
        {
            services.AddTransient<IProjectsListQuery, ProjectsListQuery>();
            services.AddTransient<ICreateProjectCommand, CreateProjectCommand>();
            services.AddTransient<IArchiveProjectCommand, ArchiveProjectCommand>();
            return services;
        }
    }
}
