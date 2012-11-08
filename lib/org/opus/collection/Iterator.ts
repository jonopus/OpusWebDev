///<reference path='../util/NumberUtil.ts'/>

module opus {
	/**
	 * Base iterator class. Iterator is not designed to be used on its own and needs to be extended to function..
	 * 
	 * @author Jon Adams
	 * @version 09/22/10
	 */
	export class Iterator{

		private _target:any;
		private _currentIndex:number;
		public loop:bool;
		private origonalIndex:number;

		/**
		 * Creates a new Iterator;
		 * 
		 * @param target The Object to be iterated over.
		 * @param index The position of iteration.
		 * @param isLooping: Indicates if the Iterator returns to the begining from the end and vice versa.
		 */
		constructor(target:any, index:number = -1, loop:bool = false) {
			this._target = target;
			this._currentIndex = this.origonalIndex = index;
			this.loop = loop;
		}
		
		/**
		 * Retrieves the object defined as target in the class' constructor.
		*/
		public get target():any {
			return this._target;
		}
		
		/**
		 * Determines if an element exists in the first posotion.
		*/
		public hasFirst():bool {
			return this.getLength() > 0;
		}

		public getLength():number {
			return 0;
		}

		/**
		 * Determines if an element exists in the last posotion.
		*/
		public hasLast():bool {
			return this.hasFirst();
		}
		
		/**
		 * Determines if an element exists in the next posotion.
		*/
		public hasNext():bool {
			if(this.loop){
				return this.hasFirst();
			}
			return this.currentIndex + 1 < this.getLength();
		}
		
		/**
		 * Determines if an element exists in the previous posotion.
		*/
		public hasPrevious():bool {
			if(this.loop){
				return this.hasFirst();
			}
			return this.currentIndex -1 > -1;
		}
		
		/**
		 * Changes current to and returns the next element. 
		*/
		public next():any {
			if(this.hasNext()){
				this.currentIndex = NumberUtil.loopIndex(this.currentIndex+1, this.getLength());
				return this.current;
			}
			return null;
		}
		
		/**
		 * Changes current to and returns the previous element. 
		*/
		public previous():any {
			if(this.hasPrevious()){
				this.currentIndex = NumberUtil.loopIndex(this.currentIndex-1, this.getLength());
				return this.current;
			}
			return null;
		}
		
		/**
		 * Changes current to and returns the first element. 
		*/
		public first():any {
			if(this.hasFirst()){
				this.currentIndex = 0;
				return this.current;
			}
			return null;
		}
		
		/**
		 * Changes current to and returns the last element. 
		*/
		public last():any {
			if(this.hasFirst()){
				this.currentIndex = this.getLength();
				return this.current;
			}
			return null;
		}
		
		/**
		 * Returns the current element. 
		*/
		public get current():any {
			return undefined;
		}
		
		/**
		 * Returns the current index. 
		*/
		public get currentIndex():number {
			return this._currentIndex;
		}
		
		/**
		 * Sets the current index and dispatches a change. 
		*/
		public set currentIndex(index:number) {
			this._currentIndex = index < this.getLength() ? index : -1;
			//dispatchEvent(new Event(Event.CHANGE));
		}
		
		public reset():void {
			this.currentIndex = this.origonalIndex
		}
	}
}
