///<reference path='../../../../../../../lib/org/opus/util/Logger.ts'/>
///<reference path='../../../../../../../lib/jquery.d.ts'/>
///<reference path='../../../../../../../lib/puremvc-typescript-singlecore-1.0.d.ts'/>
///<reference path='../constants/Constants.ts'/>
///<reference path='../ApplicationFacade.ts'/>

module opus {
	export class ApplicationMediator extends puremvc.Mediator {
		public static NAME:string = "opus.ApplicationMediator";

		private content:JQuery;

		constructor(){
			super(ApplicationMediator.NAME, null);
			Logger.log("ApplicationMediator.constructor", ApplicationMediator.NAME);
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

		public onRegister():void {
			Logger.log("ApplicationMediator.onRegister");

			$('a[href^=#]').click((e)=>this.handleHrefClick(e));

			//TODO: https://github.com/balupton/history.js/wiki/Intelligent-State-Handling
			window["History"].Adapter.bind(window, "statechange", (e)=>this.handleHashChange(e));

			$(window).trigger('statechange');
		}
		
		private handleHrefClick(e){
			Logger.log("ApplicationMediator.handleHrefClick");
			window["History"].pushState($(e.target).attr("href"));
		}

		private handleHashChange(e){
			Logger.log("ApplicationMediator.handleHashChange", this.getPage());
			ApplicationFacade.getInstance().sendNotification(Constants.PAGE_CHANGE, this.getPage());
		}

		private getPage():string{
			var page:string = window["History"].getState().hash;

			Logger.log("ApplicationMediator.getPage", page);

			while(page.charAt(0) === '/' || page.charAt(0) === '#'){
    			page = page.substr(1);
			}
			
			switch(page){
				case "./":
				case "/":
				case "":
					return "asd.html";
					break;
			}

			return page;
		}
		private handlePageChange(page:string){
			Logger.log("ApplicationMediator.loadContent", page);

			this.content = $("<div />")
			this.content.load(this.getPage(), (e)=>this.loadContent())
		}

		private loadContent(){
			Logger.log("ApplicationMediator.loadContent", this.getPage());

			$('#aside').slideUp(400);
			$("#main-content").fadeOut(400, (e)=>this.showContent())
		}

		private showContent(){
			Logger.log("ApplicationMediator.showContent");
			$('#main-content').html(this.content.get(0));
			$("#main-content").fadeIn(400);	
			
			var html = $('#main-content aside').detach().html()
			if(html){
				$('#aside').html(html || "");
				$('#aside').slideDown(400);
			}
				
		}

		public onRemove():void {
			Logger.log("ApplicationMediator.onRemove");
		}
	}
}