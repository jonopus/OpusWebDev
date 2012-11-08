///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/jquery.d.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../../../../../../../lib/Signals.ts'/>
///<reference path='../../../../../../../lib/org/casalib/time/Sequence.ts'/>
///<reference path="../../../../../../../lib/tweenjs-0.3.d.ts" />
///<reference path="../../../../../../../lib/easeljs-0.5.d.ts" />
///<reference path="../../../../../../../lib/preloadjs-0.2.d.ts" />

///<reference path='../constants/Constants.ts'/>
///<reference path='../ApplicationFacade.ts'/>
///<reference path='components/BubbleUpLogo.ts'/>

module opus {
   export class AnimationMediator extends puremvc.Mediator{
        public static NAME:string = "opus.AnimationMediator";
        
        startedup:opus.Signal = new opus.Signal();
        preloadComplete:opus.Signal = new opus.Signal();
        
        sequence:org.casalib.time.Sequence;

        preload:createjs.PreloadJS;
        
        canvas;
        stage:createjs.Stage;
        ball:createjs.Shape;
        logo:createjs.Container;
        text:createjs.Text;
        
        ballTween:createjs.Tween;
        logoTween:createjs.Tween;
        
        constructor(){
            super(AnimationMediator.NAME, null);

            this.text = new createjs.Text("Drag and drop the shapes", "24px Cinzel, serif", "#000000");
            this.text.alpha = 0;
            
            this.ball = new createjs.Shape();
            this.ball.name = "ball";
            this.ball.graphics.setStrokeStyle(5, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.beginFill("#FF0000").drawCircle(0,0,50);
            this.ball.graphics.endStroke();
            this.ball.graphics.endFill();
            this.ball.graphics.setStrokeStyle(1, 'round', 'round');
            this.ball.graphics.beginStroke(('#000000'));
            this.ball.graphics.moveTo(0,0);
            this.ball.graphics.lineTo(0,50);
            this.ball.graphics.endStroke();
            this.ball.x = 200;
            this.ball.y = 50;
            this.ball.alpha = 0;

            this.logo = new BubbleUpLogo();
            this.logo.alpha = 0;

            this.ballTween = createjs.Tween.get(this.ball);
            this.logoTween = createjs.Tween.get(this.logo);
        }

        listNotificationInterests():string[] {
            return [
                Constants.PAGE_CHANGE
            ];
        }

        public handleNotification(note):void {
           switch(note.getName()){
                case Constants.PAGE_CHANGE:this.handlePageChange(note.getBody());break;
            }
        }

        private handlePageChange(page:string){
            Logger.log("ApplicationMediator.loadContent", page);
            
            switch(page){
                case "qwe.html":
                    this.qwe();
                    break;
                case "asd.html":
                    this.asd();
                    break;
                case "zxc.html":
                    this.zxc();
                    break;
            }

            createjs.Tween
                .get(this.text)
                .to({alpha:0}, 1000, createjs["Ease"]["sineIn"])
                .call(this.updateText, [page], this)
                .to({alpha:1}, 1000, createjs["Ease"]["sineIn"]);
        }

        public updateText(page:string):void {
            Logger.log("AnimationMediator.updateText", this.text.text, page);
            this.text.text = page;
        }

        public onRegister():void {
            Logger.log("AnimationMediator.onRegister");
            
            this.sequence = new org.casalib.time.Sequence();
            this.sequence.addTask(()=>(this.createStage()));
            this.sequence.addTask(()=>(this.addItemsToStage()));
            this.sequence.addTask(()=>(this.show()));
            this.sequence.start();

            this.startedup.dispatch();
        }

        public onRemove():void {
            Logger.log("AnimationMediator.onRemove");
        }

        createStage(){
            Logger.log("AnimationMediator.createStage");

            this.canvas = $("<canvas id='canvas' width='1000' height='1000'><p>Your browser is sooooo old ! Download a modern one now !</p></canvas>").get(0);
            
            $("#animation").append(this.canvas);

            this.stage = new createjs.Stage(this.canvas);
            this.stage.autoClear = true;

            createjs.Ticker.setFPS(64);
            createjs.Ticker.addListener((x) => (this.update()));
        }

        update(){
            this.stage.update();
        }
        
        addItemsToStage(){
            Logger.log("AnimationMediator.addItemsToStage");

            this.stage.addChild(
                this.ball,
                this.logo,
                this.text
            );
        }

        show(){
            this.ballTween.to({alpha:1}, 1000, createjs["Ease"]["sineIn"]);
            this.logoTween.to({alpha:1}, 2000, createjs["Ease"]["sineIn"]);
        }

        qwe(){
            this.ballTween.to({x:5, y:10, rotation:0}, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({x:10, y:-20, rotation:5}, 2000, createjs["Ease"]["sineInOut"]);
        }

        asd(){
            this.ballTween.to({x:10, y:20, rotation:90}, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({x:20, y:-15, rotation:3}, 2000, createjs["Ease"]["sineInOut"]);
        }

        zxc(){
            this.ballTween.to({x:0, y:30, rotation:180}, 1000, createjs["Ease"]["sineInOut"]);
            this.logoTween.to({x:30, y:-10, rotation:1}, 2000, createjs["Ease"]["sineInOut"]);
        }
    }
}