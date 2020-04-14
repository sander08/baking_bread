using Bread_PSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess.Interfaces
{
    public interface IElementsDA
    {
        LogResponse[] GetLog();
        LogResponse[] UpdateStatus(UpdateStatusRequest request, int C_ID);
    }
}
