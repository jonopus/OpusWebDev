///<reference path='../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='controller/StartupCommand.ts'/>

module opus {
   export class ApplicationFacade extends puremvc.Facade{
		public initialized:bool;

        constructor(){
        	super();    
		}

		public static getInstance(){
			if(this.instance == null){
				this.instance = new ApplicationFacade();
			}

			return this.instance;
		}
		
		public startup():void {
			if (!this.initialized){
				this.initialized = true;
				this.registerCommand(Constants.STARTUP, StartupCommand);
				this.sendNotification(Constants.STARTUP);
			}
		}

		public shutdown():void {
			this.sendNotification(Constants.SHUTDOWN);
		}
    }
}