using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Caching.Memory;

namespace Bread_PSA.DataAccess
{
	/// <summary>
	/// ScriptProvider
	/// </summary>
	public static class ScriptProvider
	{
		private static readonly TimeSpan _cacheExpiration = new TimeSpan(0, 5, 0);
		private static readonly MemoryCache _cache;

		static ScriptProvider()
		{
			_cache = new MemoryCache(new MemoryCacheOptions()
			{
				ExpirationScanFrequency = _cacheExpiration
			});
		}

		public static string Get(string key)
		{
			return _cache.GetOrCreate(key, c =>
			{
				c.AbsoluteExpirationRelativeToNow = _cacheExpiration;
				return GetFileContent(key);
			});
		}

		private static string GetFileContent(string key)
		{
			var file = key + ".sql";
			var filePath = Assembly.GetExecutingAssembly().GetName().Name.TrimEnd('.') + ".DataAccess.Scripts." + file;
			try
			{
				using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(filePath))
				using (var reader = new StreamReader(stream))
				{
					var content = reader.ReadToEnd();
					if (string.IsNullOrEmpty(content))
						throw new Exception($"File [{file}] is empty.");
					return content;
				}
			}
			catch (Exception e)
			{
				throw new Exception($"Can't get the SQL script by path [{filePath}]", e);
			}
		}
	}
}
