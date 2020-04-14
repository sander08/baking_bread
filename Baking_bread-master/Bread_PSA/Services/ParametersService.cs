using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bread_PSA.Services.Interfaces;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;

namespace Bread_PSA.Services
{
    public class ParametersService : IParametersService
    {
        private IParameterDA _parametersDA;

        public ParametersService(IParameterDA parametersDA)
        {
            _parametersDA = parametersDA;
        }

        public ParametersResponse[] AutoMode(double temp, int lvl, int i)
        {
            try
            {
                var result = _parametersDA.IncrementAndGetParameter(temp, lvl, i);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public string CheckAccess(int ID)
        {
            try
            {
                var result = _parametersDA.CheckAccess(ID);
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int[] EditOptimalParameters(int level, double temperature)
        {
            var result = _parametersDA.EditOptimalParameters(level, temperature);
            return result;
        }

        public GetOptimalParameters[] GetOptimalParameters()
        {
            var result = _parametersDA.GetOptimalParameters();
            return result;
        }

        public StarterRequest[] GetProcessParameters()
        {
            var result = _parametersDA.GetProcessParameters();
            return result;
        }

    }
}
