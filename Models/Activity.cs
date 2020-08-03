using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Models
{
    //Represents template for an object that represents the table in database
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
        [DataType(DataType.Url)]
        [MaxLength(2000)]
        public string ImageUrl { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        [Required(ErrorMessage = "Please add a description...")]
        [StringLength(2000, MinimumLength = 1)]
        public string Description { get; set; }



    }
}
