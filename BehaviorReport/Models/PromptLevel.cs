using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehaviorReport.Models
{
    public class PromptLevel
    {
        public int Id { get; set; }

        [Required]
        public string Prompt { get; set; }
    }
}
