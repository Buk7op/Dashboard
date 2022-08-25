using Microsoft.Extensions.Options;
using TodoApi.Models;
using TodoApi.Infrastructure;
using TodoApi.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var services = builder.Services;
services.ConfigureDbSettings(builder.Configuration.GetSection("MongoDB"));
services.AddSingleton<ITaskService, TaskService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// var sp = services.BuildServiceProvider();
// var test = sp.GetRequiredService<IOptions<DbSettings>>();
// Console.WriteLine($"{test.Value.ConnectionString} + bla bla");

app.MapGet("api/v1/tasks", async (ITaskService taskService) => {
    var tasks = await taskService.GetAllTask();
    return Results.Ok(tasks);
});

app.MapGet("api/v1/tasks/{id}", async (ITaskService taskService, string id) => {
    var tasks = await taskService.GetTaskById(id);
    if(tasks != null)
    {
        return Results.Ok(tasks);
    }
    return Results.NotFound($"Task with id {id} not found");
});

app.MapPost("api/v1/tasks", async (ITaskService taskService, Problem task) => {
    var createdTask =  await taskService.AddTask(task);
    if(createdTask != null)
    {
        return Results.Ok(createdTask);
    }
    return Results.BadRequest();
});

app.MapDelete("api/v1/tasks/{id}", async (ITaskService taskService, string id) => {
    await taskService.DeleteTask(id);
    return Results.Ok();
});

app.MapPut("api/v1/tasks", async (ITaskService taskService, Problem task) => {
    var updatedTask = await taskService.UpdateTask(task);
    if(updatedTask != null)
    {
        return Results.Ok();
    }
    return Results.BadRequest();
});

app.Run();

