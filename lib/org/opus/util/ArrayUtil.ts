module opus {
    export class ArrayUtil{


		public static isArray(obj):bool{
			return obj.constructor.toString().indexOf('Array') != -1
		}

		/**
		Returns the first element that matches the values of all properties of the object <code>keys</code>.
			
			@param inArray: Array to search for an element with every property in the object <code>keys</code>.
			@param keys: An object with name value pairs.
			@return Returns matched <code>Object</code>; otherwise <code>null</code>.
		*/
		public static getItemByKeys(inArray:any[], keys:Object):Object {
			return getItemsByKeys(inArray, keys)[0];
		}
		
		/**
		Returns every element that matches the values of all properties of the object <code>keys</code>.
			
			@param inArray: Array to search for an element with every property in the object <code>keys</code>.
			@param keys: An object with name value pairs.
			@return Returns all the matched elements.
		*/
		public static getItemsByKeys(inArray:any[], keys:Object):any[] {
			var matches:any[] = inArray;
			for(var prop in keys){
				matches = getItemsByKey(matches, prop, keys[prop]);
			}
			
			return matches;
		}
		
		/**
		Returns the first element that matches <code>match</code> for the property <code>key</code>.
			
			@param inArray: Array to search for an element with a <code>key</code> that matches <code>match</code>.
			@param key: Name of the property to match.
			@param match: Value to match against.
			@return Returns matched <code>Object</code>; otherwise <code>null</code>.
		*/
		public static getItemByKey(inArray:any[], key:string, match:any):any {
			for (var i=0; i<inArray.length; i++){
				var item:any = inArray[i];
				if (item[key] == match){
					return item;
				}
			}
			return null;
		}
		
		/**
			Returns every element that matches <code>match</code> for the property <code>key</code>.
			
			@param inArray: Array to search for object with <code>key</code> that matches <code>match</code>.
			@param key: Name of the property to match.
			@param match: Value to match against.
			@return Returns all the matched elements.
		*/
		public static getItemsByKey(inArray:any[], key:string, match:any):any[] {
			var t:any[] = new Array();
			
			for (var i=0; i<inArray.length; i++){
				var item:any = inArray[i];
				if (item[key] == match){
					t.push(item);
				}
			}

			return t;
		}
		
		/**
			Finds out how many instances of <code>item</code> Array contains.
			
			@param inArray: Array to search for <code>item</code> in.
			@param item: Object to find.
			@return The amount of <code>item</code>'s found; if none were found returns <code>0</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 7, 7, 7, 4, 5);
					trace("numberArray contains " + ArrayUtil.contains(numberArray, 7) + " 7's.");
				</code>
		*/
		public static contains(inArray:any[], item:any):number {
			var i:number  = inArray.indexOf(item, 0);
			var t:number = 0;
			
			while (i != -1) {
				i = inArray.indexOf(item, i + 1);
				t++;
			}
			
			return t;
		}
		
		/**
			Determines if Array contains all items.
			
			@param inArray: Array to search for <code>items</code> in.
			@param items: Array of elements to search for.
			@return Returns <code>true</code> if <code>inArray</code> contains all elements of <code>items</code>; otherwise <code>false</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 4, 5);
					trace(ArrayUtil.containsAll(numberArray, new Array(1, 3, 5)));
				</code>
		*/
		public static containsAll(inArray:any[], items:any[]):bool {
			var l:number = items.length;
			
			while (l--)
				if (inArray.indexOf(items[l]) == -1)
					return false;
			
			return true;
		}
		
		/**
			Determines if Array <code>inArray</code> contains any element of Array <code>items</code>.
			
			@param inArray: Array to search for <code>items</code> in.
			@param items: Array of elements to search for.
			@return Returns <code>true</code> if <code>inArray</code> contains any element of <code>items</code>; otherwise <code>false</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 4, 5);
					trace(ArrayUtil.containsAny(numberArray, new Array(9, 3, 6)));
				</code>
		*/
		public static containsAny(inArray:any[], items:any[]):bool {
			var l:number = items.length;
			
			while (l--)
				if (inArray.indexOf(items[l]) > -1)
					return true;
			
			return false;
		}
	}
}