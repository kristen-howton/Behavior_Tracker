using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Models
{
    public class Activity
    {
        public int Id { get; set; }

        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required(ErrorMessage = "Please add an activity...")]
        [StringLength(50, MinimumLength = 1)]
        public string ActivityName { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

    }
}
