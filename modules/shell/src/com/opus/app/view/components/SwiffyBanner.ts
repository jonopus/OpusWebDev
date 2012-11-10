///<reference path='../../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='./SwiffyInstance.ts'/>

module opus {
   export class SwiffyBanner extends SwiffyInstance{
        
        public container;
        public stage;

        constructor(width:number, height:number, data:Object){
            super(width, height, data);

            $(this.container).mouseover((e)=>this.handleMouseOver(e));
            $(this.container).mouseout((e)=>this.handleMouseOut(e));
        }
		
		public handleMouseOver(e):void {
			Logger.log("SwiffyBanner.handleMouseOver", prop, this.stage);
			for(var prop in this.stage){
				Logger.log("SwiffyBanner.handleMouseOver", prop, this.stage["prop"]);
            }

			/*
			if(this.stage.totalFrames > 1){
				this.stage.gotoAndPlay(2);
			}
			*/
		}		
		
		public handleMouseOut(e):void {
			/*
			this.stage.gotoAndStop(1);
			*/
		}
    }
}