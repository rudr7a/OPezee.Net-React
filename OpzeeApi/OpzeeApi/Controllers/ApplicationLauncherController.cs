using Microsoft.AspNetCore.Mvc;
using OpezeeApi.Data;
using OpezeeApi.Models;
using System.Diagnostics;
using Newtonsoft.Json;
namespace OpezeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationLauncherController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationLauncherController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("launch")]
        public IActionResult LaunchApplication([FromBody] Application application)
        {
            if (application == null || string.IsNullOrEmpty(application.FilePath))
            {
                return BadRequest("Invalid application data.");
            }

            try
            {
               
                string filePath = application.FilePath.Replace("\"", "");
                var startInfo = new ProcessStartInfo
                {
                    FileName = filePath, 
                    Arguments = application.Parameters,
                    UseShellExecute = true,
                };

                Process.Start(startInfo);

                return Ok("Application launched successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while trying to start the application: {ex.Message}");
            }
        }

        [HttpPost("applications")]
        public async Task<IActionResult> AddApplication([FromBody] Application application)
        {
            if (application == null || string.IsNullOrEmpty(application.FilePath))
            {
                return BadRequest("Invalid application data.");
            }

            try
            {
                _context.Applications.Add(application);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Application added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while saving the application: {ex.Message}");
            }
        }

        [HttpGet("applications")]
        public IActionResult GetApplications()
        {
            var applications = _context.Applications.ToList();
            return Ok(applications);
        }

        [HttpDelete("applications/{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var application = await _context.Applications.FindAsync(id);
            if (application == null)
            {
                return NotFound();
            }

            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Application deleted successfully." });
        }
    }
}
