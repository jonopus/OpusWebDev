///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../model/buisness/AuthenticationDelegate'/>
///<reference path='../model/buisness/SpinDelegate'/>
///<reference path='../constants/Constants'/>

module opus {
	export class PrepBuisnessCommand extends puremvc.SimpleCommand{
		public execute(notification:puremvc.INotification ):void {
			Logger.log("PrepBuisnessCommand.execute");

			$.support.cors = true
		}
	}
}