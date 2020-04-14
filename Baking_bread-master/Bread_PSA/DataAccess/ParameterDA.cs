using Dapper;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess
{
    public class ParameterDA : BaseDA, IParameterDA
    {
        public ParameterDA(string connectionString) : base(connectionString)
        {

        }

        public ParametersResponse[] IncrementAndGetParameter(double temp, int lvl, int i)
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var optimalParameters = connection.Query<GetOptimalParameters>(ScriptProvider.Get("GetOptimalParameters")).ToArray();

                    var optimalTemp = optimalParameters[0].Optimal_value;
                    var optimalLvl = optimalParameters[1].Optimal_value;

                    var ll = 5;
                    var l = lvl + 5;

                    if(lvl > (optimalLvl-6))
                    {
                        ll = 1;
                    }

                    if (lvl < 6)
                    {
                        ll = 1;
                    }



                    double T = temp;
                    double Ts = optimalTemp;
                    int time = optimalTemp;
                    var k = 0.005;

                    //for (int i = 0; i < time + 1; i++)
                    //{
                        T = Ts + (T - Ts) * Math.Exp(-k * i);
                    //}


                    var result = connection.Query<ParametersResponse>(ScriptProvider.Get("IncrementAndGetParameter"),
                        new
                        {
                            optimalTemp,
                            optimalLvl,
                            temp,
                            ll,
                            T,
                            lvl
                        });
                    return result.ToArray();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public string CheckAccess(int ID)
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.QueryFirstOrDefault<string>(ScriptProvider.Get("CheckAccess"),
                        new
                        {
                            ID
                        });

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public int[] EditOptimalParameters(int level, double temperature)
        {
            using (var connection = OpenConnection())
            {
                var result = connection.Query<int>(ScriptProvider.Get("EditOptimalParameters"),
                    new
                    {
                        temperature,
                        level
                    });
                return result.ToArray();
            }
        }

        public StarterRequest[] GetProcessParameters()
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.Query<StarterRequest>(ScriptProvider.Get("GetStarterInfo"));

                    return result.ToArray();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public GetOptimalParameters[] GetOptimalParameters()
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.Query<GetOptimalParameters>(ScriptProvider.Get("GetOptimalParameters"));

                    return result.ToArray();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
