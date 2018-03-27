using System.ComponentModel.DataAnnotations;

namespace MITA.ViewModels
{
    public class CreateProjectRequest
    {
        [Required]
        [MaxLength(250)]
        public string Title { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
    }
}