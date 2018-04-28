using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MITA.Auth
{
    public class UserExternalLoginRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
