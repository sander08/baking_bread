using Bread_PSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess.Interfaces
{
    public interface ICustomerDA
    {
        LoginDetails GetCustomersByLogin(string Login);
        int? InsertCustomer(RegisterCustomerRequest customer, string passwordHash);
        CustomerInfo GetCustomerInfo(int C_ID);
        

    }
}
