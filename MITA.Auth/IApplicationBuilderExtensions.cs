using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.Auth
{
    public static class IApplicationBuilderExtensions
    {
        public static IApplicationBuilder MigrateAuthDb(this IApplicationBuilder app)
        {
            var services = app.ApplicationServices.GetService<IServiceScopeFactory>();
            using (var context = services.CreateScope().ServiceProvider.GetRequiredService<AuthDbContext>())
            {
                context.Database.Migrate();
            }
            return app;
        }
    }
}
