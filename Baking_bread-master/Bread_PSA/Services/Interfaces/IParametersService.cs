using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bread_PSA.Models;

namespace Bread_PSA.Services.Interfaces
{
    public interface IParametersService
    {
        ParametersResponse[] AutoMode(double temp, int lvl, int i);
        string CheckAccess(int ID);
        public int[] EditOptimalParameters(int level, double temperature);
        StarterRequest[] GetProcessParameters();
        public GetOptimalParameters[] GetOptimalParameters();
    }
}
