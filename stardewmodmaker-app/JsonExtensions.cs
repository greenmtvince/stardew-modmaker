using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace stardewmodmaker_app
{
    public static class JsonExtensions
    {
        public static T ToObject<T>(this JsonElement element)
        {
            var json = element.GetRawText();
            return JsonSerializer.Deserialize<T>(json);
        }
        public static T ToObject<T>(this JsonDocument document)
        {
            var json = document.RootElement.GetRawText();
            return JsonSerializer.Deserialize<T>(json);
        }
    }
}
