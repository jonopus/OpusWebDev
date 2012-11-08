///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../view/ApplicationMediator.ts'/>
///<reference path='../ApplicationFacade.ts'/>
///<reference path='../constants/Constants.ts'/>

module opus {
   export class PrepControllCommand extends puremvc.SimpleCommand{
   		public execute(notification:puremvc.INotification ):void {
			Logger.log("PrepControllCommand.execute");
			//ApplicationFacade.getInstance().registerCommand(Constants.AUTHENTICATE, AuthenticateCommand);
		}
    }
}