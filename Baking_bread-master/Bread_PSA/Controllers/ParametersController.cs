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
    public class ParametersController : ControllerBase
    {
        private IParametersService _parametersService;

        public ParametersController(IParametersService parametersService)
        {
            _parametersService = parametersService;
        }



        /// <summary>
        /// Auto Mode
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AutoMode")]
        public IActionResult AutoMode([FromForm] EditOptimalParametersRequest request, [FromQuery] int ID)
        {
            if (_parametersService.CheckAccess(ID) != null)
            {
                var result = _parametersService.AutoMode(request.temperature, request.level, request.i);
                if (result == null)
                {
                    return BadRequest("Invalid credentials");
                }
                else
                {
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest("Invalid autorization");
            }
        }

        /// <summary>
        /// Edit Optimal Parameters
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("EditOptimalParameters")]
        public IActionResult EditOptimalParameters([FromForm] EditOptimalParametersRequest request, [FromQuery] int ID)
        {
            if(_parametersService.CheckAccess(ID) == "admin")
            {
                var result = _parametersService.EditOptimalParameters(request.level, request.temperature);
                if (result == null)
                {
                    return BadRequest("Invalid credentials");
                }
                else
                {
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest("Invalid autorization");
            }
        }

        /// <summary>
        /// Starter Request
        /// </summary>
        /// <param name="request"></param>
        /// <returns> CustomerID </returns>
        [HttpPost]
        [Route("StarterRequest")]
        public IActionResult StarterRequest([FromQuery] int ID)
        {
            if (_parametersService.CheckAccess(ID) != null)
            {
                var result = _parametersService.GetProcessParameters();

                if (result == null)
                    return BadRequest("Invalid credentials");

                return Ok(result);
            }
            else
            {
                return BadRequest("Invalid autorization");
            }
        }

        /// <summary>
        /// Get Optimal Parameters
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetOptimalParameters")]
        public IActionResult GetOptimalParameters([FromQuery] int ID)
        {
            if (_parametersService.CheckAccess(ID) != null)
            {
                var result = _parametersService.GetOptimalParameters();
                if (result == null)
                {
                    return BadRequest("Invalid credentials");
                }
                else
                {
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest("Invalid autorization");
            }
        }
    }
}