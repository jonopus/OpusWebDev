///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../view/ApplicationMediator.ts'/>
///<reference path='../view/AnimationMediator.ts'/>
///<reference path='../ApplicationFacade.ts'/>
///<reference path='../constants/Constants.ts'/>

module opus {
   export class PrepViewCommand extends puremvc.SimpleCommand{
   		public execute(notification:puremvc.INotification ):void {
			Logger.log("PrepViewCommand.execute");
			ApplicationFacade.getInstance().registerMediator(new AnimationMediator());
			ApplicationFacade.getInstance().registerMediator(new ApplicationMediator());
		}
    }
}