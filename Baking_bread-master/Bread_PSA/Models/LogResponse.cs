using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.Models
{
    public class LogResponse
    {
        public int L_ID { get; set; }
        public int C_ID { get; set; }
        public int E_ID { get; set; }
        public int Status { get; set; }
        public DateTime Time { get; set; }
    }
}
