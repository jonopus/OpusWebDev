///<reference path='../../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../../lib/signals.ts'/>

module opus {
   export class AbstractDelegate{
   		public serviceURL:string;
		public method:string;
   		public dataType:string;
		public xhr;
		public cache:bool;
		public crossDomain:bool;
		public result:any;

   		completed:Signal;
		failed:Signal;

   		constructor(serviceURL:string, method:string){
   			this.serviceURL = serviceURL;
   			this.method = method;
   			this.completed = new Signal();
   			this.failed = new Signal();
   		}

		public execute(data:any = null):void {
			Logger.log("AbstractDelegate.execute");

			var settings =  {};
			
			if(data){
				settings["data"] = data;
			}

			if(this.dataType){
				settings["dataType"] = this.dataType;
			}
			
			if(this.xhr){
				settings["xhr"] = this.xhr;
			}
			
			if(this.crossDomain){
				settings["crossDomain"] = this.crossDomain;
			}
			
			if(this.cache){
				settings["cache"] = this.cache;
			}
		  	
		  	settings["success"] = (data, textStatus, jqxhr)=>(this.parse(data, textStatus, jqxhr))
			settings["error"] = (data)=>(this.error(data));

			var url:string = this.serviceURL + this.method;

			$.ajax(url, settings);
		}

		private parse(data, textStatus, jqxhr):void{
			Logger.log("AbstractDelegate.parse: ", textStatus);

			this.result = data;

			this.completed.dispatch();
		}

		private error(data):void{
			Logger.log("AbstractDelegate.error, Error:", data.status, ", ", data.statusText);

			this.failed.dispatch();
		}
    }
}