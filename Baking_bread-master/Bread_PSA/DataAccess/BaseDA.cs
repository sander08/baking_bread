using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.DataAccess
{
    public class BaseDA
    {
        protected string _connectionString;
        public BaseDA(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected IDbConnection OpenConnection()
        {
            try
            {
                var connection = new SqlConnection(_connectionString);
                connection.Open();

                return connection;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
