///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='PrepBuisnessCommand.ts'/>
///<reference path='PrepModelCommand.ts'/>
///<reference path='PrepControllCommand.ts'/>
///<reference path='PrepViewCommand.ts'/>

module opus {
   export class StartupCommand extends puremvc.MacroCommand{
		public initializeMacroCommand():void{
			Logger.log("StartupCommand.initializeMacroCommand");
			this.addSubCommand(PrepModelCommand);
			this.addSubCommand(PrepViewCommand);
			this.addSubCommand(PrepControllCommand);
			this.addSubCommand(PrepBuisnessCommand);
		}
    }
}