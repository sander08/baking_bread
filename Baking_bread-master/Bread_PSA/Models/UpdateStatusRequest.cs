using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bread_PSA.Models
{
    public class UpdateStatusRequest
    {
        //public int ID { get; set; }
        public int E_ID1 { get; set; }
        public int E_ID2 { get; set; }
        public int Status { get; set; }
    }
}
