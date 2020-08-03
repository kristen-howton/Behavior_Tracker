using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Models
{
    public class Behavior
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please select a behavior...")]
        [StringLength(50, MinimumLength = 1)]
        public string BehaviorName { get; set; }

        [Required]
        public int LearnerId { get; set; }
        public Learner Learner { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

    }
}
