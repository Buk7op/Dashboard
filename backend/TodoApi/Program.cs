using Microsoft.Extensions.Options;
using TodoApi.Infrastructure;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var services = builder.Services;
services.ConfigureDbSettings(builder.Configuration.GetSection("MongoDB"));





var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// var sp = services.BuildServiceProvider();
// var test = sp.GetRequiredService<IOptions<DbSettings>>();
// Console.WriteLine($"{test.Value.ConnectionString} + bla bla");

app.Run();

