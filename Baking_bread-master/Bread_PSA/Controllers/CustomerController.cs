using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bread_PSA.Models;
using Bread_PSA.Services.Interfaces;



namespace Bread_PSA.Controllers
{

    /// <summary>
    /// Costomer Controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {

        private ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// TestConnection
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Test connection {ID}")]
        public IActionResult TestConnection(int ID)
        {
            var request = new GetCustomerInfoRequest()
            {
                C_ID = ID
            };
            var customer = _customerService.GetCustomerInfo(request);

            if (customer == null)
            {
                return BadRequest("Invalid credentials");
            }
            return Ok(customer);
        }

        /// <summary>
        /// Register Customer
        /// </summary>
        /// <param name="request"></param>
        /// <returns> CustomerID </returns>
        [HttpPost]
        [Route("RegisterCustomer")]
        public IActionResult RegisterCustomer([FromForm] RegisterCustomerRequest request)
        {
            var customerID = _customerService.RegisterCustomer(request);

            if (customerID.HasValue)
                return Ok(new
                {
                    CustomerID = customerID
                });

            return BadRequest();
        }

        /// <summary>
        /// Login Customer
        /// </summary>
        /// <param name="request"></param>
        /// <returns> CustomerID </returns>
        [HttpPost]
        [Route("Login")]
        public IActionResult LoginCustomer( [FromForm] LoginRequest request )
        {
            /*var request = new LoginRequest
            {
                Login = login,
                Password = password
            };*/
            var result = _customerService.LoginCustomer(request);

            if (result.C_ID == 0)
                return BadRequest("Invalid credentials");

            return Ok(result);
        }

        
    } 
}