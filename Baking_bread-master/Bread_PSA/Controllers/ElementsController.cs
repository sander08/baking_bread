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
    /// Elements Controller
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ElementsController : Controller
    {
        private IElementsService _elementsService;

        public ElementsController(IElementsService elementsService)
        {
            _elementsService = elementsService;
        }

        /// <summary>
        /// Get Log
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("GetLog")]
        public IActionResult GetLog()
        {
            var result = _elementsService.GetLog();
            if (result == null)
            {
                return BadRequest("Invalid credentials");
            }
            else
            {
                return Ok(result);
            }
        }

        /// <summary>
        /// Update status
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("UpdateStatus")]
        public IActionResult UpdateStatus([FromForm] UpdateStatusRequest request, [FromQuery] int ID)
        {
            try
            {
                var result = _elementsService.UpdateStatus(request, ID);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
            
        }
    }
}