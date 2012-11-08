module opus {
	export class JSONUtil extends puremvc.Proxy {
		public static stringify(obj:any):string {         
	        if ("JSON" in window) {
	            return JSON.stringify(obj);
	        }

	        var t = typeof (obj);
	        if (t != "object" || obj === null) {
	            // simple data type
	            if (t == "string") obj = '"' + obj + '"';

	            return String(obj);
	        } else {
	            // recurse array or object
	            var n, v, json = [], arr = (obj && obj.constructor == Array);

	            for (n in obj) {
	                v = obj[n];
	                t = typeof(v);
	                if (obj.hasOwnProperty(n)) {
	                    if (t == "string") {
	                        v = '"' + v + '"';
	                    } else if (t == "object" && v !== null){
	                        v = JSONUtil.stringify(v);
	                    }

	                    json.push((arr ? "" : '"' + n + '":') + String(v));
	                }
	            }

	            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	        }
	    }
	}
}