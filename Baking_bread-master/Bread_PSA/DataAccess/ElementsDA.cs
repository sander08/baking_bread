using Dapper;
using Bread_PSA.DataAccess.Interfaces;
using Bread_PSA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess
{
    public class ElementsDA : BaseDA, IElementsDA
    {
        public ElementsDA(string connectionString) : base(connectionString)
        {

        }

        public LogResponse[] GetLog()
        {
            try
            {
                using (var connection = OpenConnection())
                {
                    var result = connection.Query<LogResponse>(ScriptProvider.Get("GetLog"));
                    return result.ToArray();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public LogResponse[] UpdateStatus(UpdateStatusRequest request, int C_ID)
        {
            using (var connection = OpenConnection())
            {
                var E_ID1 = request.E_ID1;
                var E_ID2 = request.E_ID2;
                var Status = request.Status;
                var temp = connection.Execute(ScriptProvider.Get("UpdateElementsStatus"),
                    new
                    {
                        E_ID1,
                        E_ID2,
                        Status
                    });

                var temp2 = connection.Execute(ScriptProvider.Get("UpdateLog"),
                    new
                    {
                        C_ID,
                        E_ID1,
                        E_ID2,
                        Status
                    });
                var result = connection.Query<LogResponse>(ScriptProvider.Get("GetLog"));
                return result.ToArray();

            }
        }
    }
}
