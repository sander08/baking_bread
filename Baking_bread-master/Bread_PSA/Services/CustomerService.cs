using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;
using Bread_PSA.Services.Interfaces;

namespace Bread_PSA.Services
{
    public class CustomerService : ICustomerService
    {
        private ICustomerDA _customersDA;

        public CustomerService(ICustomerDA customersDA)
        {
            _customersDA = customersDA;
        }

        public CustomerInfo GetCustomerInfo(GetCustomerInfoRequest request)
        {
            try
            {
                var customer = _customersDA.GetCustomerInfo(request.C_ID);
                return customer;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int? RegisterCustomer(RegisterCustomerRequest request)
        {
            try
            {
                var passwordHash = ComputeHash(request.Password);
                var customerID = _customersDA.InsertCustomer(request, passwordHash);

                return customerID;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public LoginResponse LoginCustomer(LoginRequest request)
        {
            try
            {
                var loginDetails = _customersDA.GetCustomersByLogin(request.login);
                if(loginDetails.Password == ComputeHash(request.password))
                {
                    var result = new LoginResponse
                    {
                        C_ID = loginDetails.C_ID,
                        Type = loginDetails.Type
                    };
                    return result;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        


        private string ComputeHash(string password)
        {
            using var md5 = MD5.Create();

            var bytes = Encoding.UTF8.GetBytes(password);
            var buffer = md5.ComputeHash(bytes, 0, bytes.Length > 128 ? 128 : bytes.Length);

            return Convert.ToBase64String(buffer);
        }
    }
}
