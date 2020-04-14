using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Bread_PSA.DataAccess;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Services;
using Bread_PSA.Services.Interfaces;
using System;
using System.IO;
using System.Reflection;

namespace Bread_PSA
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PinkMilk", Version = "v1" });

                //var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                //var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                //c.IncludeXmlComments(xmlPath);
            });

            var connectionString = Configuration.GetConnectionString("MilkDB2");

            services.AddSingleton<ICustomerDA, CustomerDA>(s => new CustomerDA(connectionString));
            services.AddSingleton<ICustomerService, CustomerService>();

            services.AddSingleton<IParameterDA, ParameterDA>(s => new ParameterDA(connectionString));
            services.AddSingleton<IParametersService, ParametersService>();

            services.AddSingleton<IElementsDA, ElementsDA>(s => new ElementsDA(connectionString));
            services.AddSingleton<IElementsService, ElementsService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            

      

            app.UseHttpsRedirection();

            app.UseRouting();
            // 
            app.UseCors(builder => builder.AllowAnyOrigin());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PinkMilk V1");
                c.RoutePrefix = string.Empty;
            });
        }
    }
}
