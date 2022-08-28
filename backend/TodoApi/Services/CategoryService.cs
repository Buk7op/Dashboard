using Microsoft.Extensions.Options;
using TodoApi.DAL;
using TodoApi.Infrastructure;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DBAccessor _dbAccessor;

        public CategoryService(IOptions<DbSettings> settings)
        {
            _dbAccessor = new DBAccessor(settings.Value);
        }
        public async Task<Category?> AddCategory(Category category) => await _dbAccessor.AddCategory(category);
        
        public async Task DeleteCategory(string id){
            await _dbAccessor.DeleteCategoryById(id);
            await _dbAccessor.DeleteCategoryFromTask(id);
        } 

        public async Task<List<Category>?> GetAllCategories() => await _dbAccessor.GetAllCategories();

        public async Task<List<Category>?> GetCategoriesByTitle(string title)
        {
            if(String.IsNullOrEmpty(title))
            {
                return await GetAllCategories();
            } 
            else
            {
                return await  _dbAccessor.GetCategoryByTitle(title);
            }
        }

        public async Task<Category?> UpdateCategory(Category category) => await _dbAccessor.UpdateCategory(category);
        
    }
}