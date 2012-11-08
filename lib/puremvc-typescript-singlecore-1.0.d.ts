declare module puremvc
{

	export interface ICommand
	{
		execute( notification:INotification ):void;
	}

	export interface IController
	{
		executeCommand( notification:INotification ):void;
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		hasCommand( notificationName:string ):Boolean;
		removeCommand( notificationName:string ):void;
	}
	export interface IFacade
		extends INotifier
	{
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		removeCommand( notificationName:string ): void;
		hasCommand( notificationName:string ):Boolean;
		registerProxy( proxy:IProxy ):void;
		retrieveProxy( proxyName:string ):IProxy;
		removeProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):Boolean;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):Boolean;
		notifyObservers( note:INotification ):void;
	}

	export interface IMediator
	{
		getMediatorName():string;
		getViewComponent():Object;
		setViewComponent( viewComponent:Object ):void;
		listNotificationInterests( ):string[];
		handleNotification( notification:INotification ):void;
		onRegister():void;
		onRemove():void;
	}

	export interface IModel
	{
		registerProxy( proxy:IProxy ):void;
		removeProxy( proxyName:string ):IProxy;
		retrieveProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):Boolean;
	}

	export interface INotification
	{
		getName():string;
		setBody( body:Object ):void;
		getBody():Object;
		setType( type:string ):void;
		getType():string;
		toString():string;
	}

	export interface INotifier
	{
		sendNotification( name:string, body:Object, type:string ):void;
	}

	export interface IObserver
	{
		setNotifyMethod( notifyMethod:Function ):void;
		setNotifyContext( notifyContext:Object ):void;
		notifyObserver( notification:INotification ):void;
		compareNotifyContext( object:Object ):Boolean;
	}

	export interface IProxy
	{
		getProxyName():string;
		setData( data:Object ):void;
		getData():Object;
		onRegister( ):void;
		onRemove( ):void;
	}

	export interface IView
	{
		registerObserver( notificationName:string, observer:IObserver ):void;
		removeObserver( notificationName:string, notifyContext:Object ):void;
		notifyObservers( note:INotification ):void;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):Boolean;
	}

    export class View implements IView
	{
        private mediatorMap: Object;
        private observerMap: Object;
        constructor ();
        public initializeView(): void;
        public registerObserver(notificationName: string, observer: IObserver): void;
        public removeObserver(notificationName: string, notifyContext: Object): void;
        public notifyObservers(notification: INotification): void;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): Boolean;
        static SINGLETON_MSG: string;
        static instance;
        static getInstance(): IView;
    }

    export class Observer implements IObserver
	{
        public notify: Function;
        public context: Object;
        constructor (notifyMethod: Function, notifyContext: Object);
        private getNotifyMethod(): Function;
        public setNotifyMethod(notifyMethod: Function): void;
        private getNotifyContext(): Object;
        public setNotifyContext(notifyContext: Object): void;
        public notifyObserver(notification: INotification): void;
        public compareNotifyContext(object: Object): Boolean;
    }

    export class Controller implements IController
	{
        private view;
        private commandMap: Object;
        constructor ();
        public initializeController(): void;
        public executeCommand(notification: INotification): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public hasCommand(notificationName: string): Boolean;
        public removeCommand(notificationName: string): void;
        static instance;
        static SINGLETON_MSG: string;
        static getInstance(): IController;
    }

    export class Model implements IModel
	{
        private proxyMap: Object;
        constructor ();
        private initializeModel(): void;
        public registerProxy(proxy: IProxy): void;
        public removeProxy(proxyName: string): IProxy;
        public retrieveProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): Boolean;
        static SINGLETON_MSG: string;
        static instance;
        static getInstance(): IModel;
    }

    export class Notifier implements INotifier
	{
        private facade;
        constructor ();
        public sendNotification(name: string, body?: Object, type?: string): void;
    }

    export class MacroCommand extends Notifier implements ICommand, INotifier
	{
        private subCommands: Function[];
        constructor ();
        public initializeMacroCommand(): void;
        public addSubCommand(commandClassRef: Function): void;
        public execute(notification: INotification): void;
    }

    export class SimpleCommand extends Notifier implements ICommand, INotifier
	{
        public execute(notification: INotification): void;
    }

    export class Facade implements IFacade
	{
        private model;
        private view;
        private controller;
        constructor ();
        private initializeFacade(): void;
        private initializeModel(): void;
        private initializeController(): void;
        private initializeView(): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public removeCommand(notificationName: string): void;
        public hasCommand(notificationName: string): Boolean;
        public registerProxy(proxy: IProxy): void;
        public retrieveProxy(proxyName: string): IProxy;
        public removeProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): Boolean;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): Boolean;
        public notifyObservers(notification: INotification): void;
        public sendNotification(name: string, body?: Object, type?: string): void;
        static SINGLETON_MSG: string;
        static instance;
        static getInstance(): IFacade;
	}

    export class Mediator extends Notifier implements IMediator, INotifier
	{
        private mediatorName: string;
        private viewComponent: Object;
        constructor (mediatorName?: string, viewComponent?: Object);
        public getMediatorName(): string;
        public getViewComponent(): Object;
        public setViewComponent(viewComponent: Object): void;
        public listNotificationInterests(): string[];
        public handleNotification(notification: INotification): void;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }

    export class Notification implements INotification
	{
        private name: string;
        private body: Object;
        private type: string;
        constructor (name: string, body?: Object, type?: string);
        public getName(): string;
        public setBody(body: Object): void;
        public getBody(): Object;
        public setType(type: string): void;
        public getType(): string;
        public toString(): string;
    }

    export class Proxy extends Notifier implements IProxy, INotifier
	{
        private proxyName: string;
        private data: Object;
        constructor (proxyName?: string, data?: Object);
        public getProxyName(): string;
        public setData(data: Object): void;
        public getData(): Object;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }
}
