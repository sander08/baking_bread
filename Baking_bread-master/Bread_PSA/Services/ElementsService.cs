using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;
using Bread_PSA.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.Services
{
    public class ElementsService : IElementsService
    {
        private IElementsDA _elementsDA;

        public ElementsService(IElementsDA elementsDA)
        {
            _elementsDA = elementsDA;
        }

        public LogResponse[] GetLog()
        {
            var result = _elementsDA.GetLog();
            return result;
        }

        public LogResponse[] UpdateStatus(UpdateStatusRequest request, int ID)
        {
            var result = _elementsDA.UpdateStatus(request, ID);
            return result;
        }
    }
}
