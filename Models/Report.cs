using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Models
{
    public class Report
    {
        public int Id { get; set; }

        [Required]
        public int BehaviorId { get; set; }
        public Behavior Behavior { get; set; }

        [Required]
        public int ConsequenceId { get; set; }
        public Consequence Consequence { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:MMM dd, yyyy}")]
        public DateTime Date { get; set; }

        [Required]
        public int LearnerId { get; set; }
        public Learner Learner { get; set; }

        [Required]
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
            
        [Required(ErrorMessage = "Hmmm...Looks like your forgot to add your note...")]
        [StringLength(500, MinimumLength = 1)]
        public string Note { get; set; }


    }
}
