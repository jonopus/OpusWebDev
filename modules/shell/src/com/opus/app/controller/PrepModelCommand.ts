///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../ApplicationFacade.ts'/>
///<reference path='../model/SpinProxy.ts'/>

module opus {
   export class PrepModelCommand extends puremvc.SimpleCommand{
   		public execute(notification:puremvc.INotification ):void {
			Logger.log("PrepModelCommand.execute");
			//ApplicationFacade.getInstance().registerProxy(new SpinProxy());
		}
    }
}