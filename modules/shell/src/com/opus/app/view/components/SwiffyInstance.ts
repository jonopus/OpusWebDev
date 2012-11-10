///<reference path="../../../../../../../../lib/swiffy-4.9.d.ts" />

module opus {
   export class SwiffyInstance{
        
        public container;
        public stage;

        constructor(width:number, height:number, data:Object){
            this.container = $("<div style='width: "+width+"px; height: "+height+"px'>").get(0);
            this.stage = new swiffy.Stage(this.container,
            	data)
            this.stage.start()
        }
    }
}