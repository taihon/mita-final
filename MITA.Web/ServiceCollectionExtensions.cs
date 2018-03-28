using Microsoft.Extensions.DependencyInjection;
using MITA.DAL.Implementation.Projects;
using MITA.DAL.Implementation.Tasks;
using MITA.DAL.Projects;
using MITA.DAL.Tasks;
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
            //projects
            services.AddTransient<IProjectsListQuery, ProjectsListQuery>();
            services.AddTransient<ICreateProjectCommand, CreateProjectCommand>();
            services.AddTransient<IArchiveProjectCommand, ArchiveProjectCommand>();
            services.AddTransient<IUpdateProjectCommand, UpdateProjectCommand>();
            services.AddTransient<IRestoreProjectCommand, RestoreProjectCommand>();
            services.AddTransient<IProjectQuery, ProjectQuery>();

            //tasks
            services.AddTransient<ITasksListQuery, TasksListQuery>();
            services.AddTransient<ICreateTaskCommand, CreateTaskCommand>();
            services.AddTransient<IUpdateTaskCommand, UpdateTaskCommand>();
            return services;
        }
    }
}
