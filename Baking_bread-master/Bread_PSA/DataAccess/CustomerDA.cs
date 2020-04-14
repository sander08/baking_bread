using Dapper;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess
{
    public class CustomerDA : BaseDA, ICustomerDA
    {
        public CustomerDA(string connectionString) : base(connectionString)
        {

        }

        public CustomerInfo GetCustomerInfo(int C_ID)
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.QueryFirst<CustomerInfo>(ScriptProvider.Get("testScript"),
                        new
                        {
                            C_ID
                        });
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public LoginDetails GetCustomersByLogin(string Login)
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.QueryFirstOrDefault<LoginDetails>(ScriptProvider.Get("SelectCustomerByLogin"),
                        new
                        {
                            Login
                        });

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int? InsertCustomer(RegisterCustomerRequest customer, string passwordHash)
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.QueryFirstOrDefault<int?>(ScriptProvider.Get("InsertCustomer"),
                        new
                        {
                            FirstName = customer.FirstName,
                            LastName = customer.LastName,
                            CustomerLogin = customer.Login,
                            PasswordHash = passwordHash,
                            CustomerType = customer.Type                 
                        });

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }





    }
}
