///<reference path='com/opus/app/ApplicationFacade.ts'/>

module opus {
   export class Main{
        public init():void {
            opus.ApplicationFacade.getInstance().startup();
        }

        public destroy():void {
            opus.ApplicationFacade.getInstance().shutdown();
        }
    }
}

new opus.Main().init();