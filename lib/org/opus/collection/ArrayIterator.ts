///<reference path='Iterator.ts'/>

module opus {
	
	/**
	 * @author Jon Adams
	 * @version 09/22/10
	 * 
	 * @example
	 * <code>
	 * 	var list:List = new List(["a", "b", "c", "d"]);
	 * 		
	 * 	var iterator:ListIterator = new ListIterator(list);
	 * 	 	
	 * 	while(iterator.hasNext()) {
	 * 		trace(iterator.next());
	 * 	}
	 * </code>
	 */
	export class ArrayIterator extends Iterator{

		/**
		 * Creates a new ArrayIterator;
		 * 
		 * @param array The Array to be iterated over.
		 * @param index The position of iteration.
		 * @param isLooping: Indicates if the Iterator returns to the begining from the end and vice versa.
		 */
		constructor(array:any[], index:number = -1, loop:bool = false) {
			super(array, index, loop);
		}
		
		/**
		 * Retrieves the target and casts it as an Array.
		*/
		public get array():any[] {
			return <any[]>this.target;
		}
		
		/**
		 * Retrieves the number of elements in the Array.
		*/
		public getLength():number{
			return this.array.length;
		}
		
		/**
		 * Retrieves the current element.
		*/
		public get current():any {
			return this.array[this.currentIndex];
		}
		
		/**
		 * Sets the current element.
		*/
		public set current(target:any) {
			this.currentIndex = this.array.indexOf(target);
		}
	}
}
