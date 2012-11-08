module opus {
    export class Logger{
		public static log(...messages:any[]):void{
			if(window.console && window.console.log){
				window.console.log((new Date().getTime().toString()) + ", " + messages.join(", "));
			} 
		}
	}
}