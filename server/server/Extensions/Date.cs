using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Extensions
{
    public static class Date
    {
        /// <summary>
        /// dd.MM.yyyy
        /// </summary>
        /// <param name="v"></param>
        /// <returns></returns>
        public static string toDDMMYYYYbyPoint(this DateTime v)
        {
            return v.ToString("dd.MM.yyyy HH:mm:ss").Split(' ')[0];
        }
    }
}