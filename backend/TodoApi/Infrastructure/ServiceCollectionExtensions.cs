namespace TodoApi.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection ConfigureDbSettings(this IServiceCollection services, IConfiguration dbSettingsSection)
        {
            services.Configure<DbSettings>(dbSettingsSection);       
            return services;
        }
    }
}