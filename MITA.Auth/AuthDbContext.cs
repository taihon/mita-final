﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace MITA.Auth
{
    public class AuthDbContext : IdentityDbContext<User,Role,Guid>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        internal AuthDbContext()
        {
        }
    }
}
