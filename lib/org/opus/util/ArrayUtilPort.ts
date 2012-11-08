module opus {
    export class ArrayUtil{


		/**
		Returns the first element that matches the values of all properties of the object <code>keys</code>.
			
			@param inArray: Array to search for an element with every property in the object <code>keys</code>.
			@param keys: An object with name value pairs.
			@return Returns matched <code>Object</code>; otherwise <code>null</code>.
		*/
		public static getItemByKeys(inArray:any[], keys:object):object {
			return getItemsByKeys(inArray, keys)[0];
		}
		
		/**
		Returns every element that matches the values of all properties of the object <code>keys</code>.
			
			@param inArray: Array to search for an element with every property in the object <code>keys</code>.
			@param keys: An object with name value pairs.
			@return Returns all the matched elements.
		*/
		public static getItemsByKeys(inArray:any[], keys:object):any[] {
			var matches:any[] = inArray;
			for(var prop:string in keys){
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
			for each (var item:any in inArray){
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
			
			for each (var item:any in inArray)
				if (item[key] == match)
					t.push(item);
			
			return t;
		}
		
		/**
			Returns the first element that is compatible with a specific data type, class, or interface.
			
			@param inArray: Array to search for an element of a specific type.
			@param type: The type to compare the elements to.
			@return Returns all the matched elements.
		*/
		public static getItemByType(inArray:any[], type:Class):any {
			for each (var item:any in inArray)
				if (item is type)
					return item;
			
			return null;
		}
		
		/**
			Returns every element that is compatible with a specific data type, class, or interface.
			
			@param inArray: Array to search for elements of a specific type.
			@param type: The type to compare the elements to.
			@return Returns all the matched elements.
		*/
		public static getItemsByType(inArray:any[], type:Class):any[] {
			var t:any[] = new Array();
			
			for each (var item:any in inArray)
				if (item is type)
					t.push(item);
			
			return t;
		}
		
		/**
			Determines if two Arrays contain the same objects at the same index.
			
			@param first: First Array to compare to the <code>second</code>.
			@param second: Second Array to compare to the <code>first</code>.
			@return Returns <code>true</code> if Arrays are the same; otherwise <code>false</code>.
		*/
		public static equals(first:any[], second:any[]):Boolean {
			var i:number = first.length;
			if (i != second.length)
				return false;
			
			while (i--)
				if (first[i] != second[i])
					return false;
			
			return true;
		}
		
		/**
			Modifies original Array by adding all the elements from another Array at a specified position.
			
			@param tarArray: Array to add elements to.
			@param items: Array of elements to add.
			@param index: Position where the elements should be added.
			@return Returns <code>true</code> if the Array was changed as a result of the call; otherwise <code>false</code>.
			@example
				<code>
					var alphabet:any[] = new Array("a", "d", "e");
					var parts:any[]    = new Array("b", "c");
					
					ArrayUtil.addItemsAt(alphabet, parts, 1);
					
					trace(alphabet);
				</code>
		*/
		public static addItemsAt(tarArray:any[], items:any[], index:number = 0x7FFFFFFF):Boolean {
			if (items.length == 0)
				return false;
			
			var args:any[] = items.concat();
			args.splice(0, 0, index, 0);
			
			tarArray.splice.apply(null, args);
			
			return true;
		}
		
		/**
			Creates new Array composed of only the non-identical elements of passed Array.
			
			@param inArray: Array to remove equivalent items.
			@return A new Array composed of only unique elements.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 4, 4, 4, 4, 5);
					trace(ArrayUtil.removeDuplicates(numberArray));
				</code>
		*/
		public static removeDuplicates(inArray:any[]):any[] {
			return inArray.filter(ArrayUtil._removeDuplicatesFilter);
		}
		
		protected static _removeDuplicatesFilter(e:any, i:number, inArray:any[]):Boolean {
			return (i == 0) ? true : inArray.lastIndexOf(e, i - 1) == -1;
		}
		
		/**
			Modifies original Array by removing all items that are identical to the specified item.
			
			@param tarArray: Array to remove passed <code>item</code>.
			@param item: Element to remove.
			@return The amount of removed elements that matched <code>item</code>, if none found returns <code>0</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 7, 7, 7, 4, 5);
					trace("Removed " + ArrayUtil.removeArrayItem(numberArray, 7) + " items.");
					trace(numberArray);
				</code>
		*/
		public static removeItem(tarArray:any[], item:any):number {
			var i:number  = tarArray.indexOf(item);
			var f:number = 0;
			
			while (i != -1) {
				tarArray.splice(i, 1);
				
				i = tarArray.indexOf(item, i);
				
				f++;
			}
			
			return f;
		}
		
		/**
			Removes only the specified items in an Array.
			
			@param tarArray: Array to remove specified items from.
			@param items: Array of elements to remove.
			@return Returns <code>true</code> if the Array was changed as a result of the call; otherwise <code>false</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 7, 7, 7, 4, 5);
					ArrayUtil.removeItems(numberArray, new Array(1, 3, 7, 5));
					trace(numberArray);
				</code>
		*/
		public static removeItems(tarArray:any[], items:any[]):Boolean {
			var removed:Boolean = false;
			var l:number          = tarArray.length;
			
			while (l--) {
				if (items.indexOf(tarArray[l]) > -1) {
					tarArray.splice(l, 1);
					removed = true;
				}
			}
			
			return removed;
		}
		
		/**
			Retains only the specified items in an Array.
			
			@param tarArray: Array to remove non specified items from.
			@param items: Array of elements to keep.
			@return Returns <code>true</code> if the Array was changed as a result of the call; otherwise <code>false</code>.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 7, 7, 7, 4, 5);
					ArrayUtil.retainItems(numberArray, new Array(2, 4));
					trace(numberArray);
				</code>
		*/
		public static retainItems(tarArray:any[], items:any[]):Boolean {
			var removed:Boolean = false;
			var l:number        = tarArray.length;
			
			while (l--) {
				if (items.indexOf(tarArray[l]) == -1) {
					tarArray.splice(l, 1);
					removed = true;
				}
			}
			
			return removed;
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
		public static containsAll(inArray:any[], items:any[]):Boolean {
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
		public static containsAny(inArray:any[], items:any[]):Boolean {
			var l:number = items.length;
			
			while (l--)
				if (inArray.indexOf(items[l]) > -1)
					return true;
			
			return false;
		}
		
		/**
			Compares two Arrays and finds the first index where they differ.
			
			@param first: First Array to compare to the <code>second</code>.
			@param second: Second Array to compare to the <code>first</code>.
			@param fromIndex: The location in the Arrays from which to start searching for a difference.
			@return The first position/index where the Arrays differ; if Arrays are identical returns <code>-1</code>.
			@example
				<code>
					var color:any[]     = new Array("Red", "Blue", "Green", "Indigo", "Violet");
					var colorsAlt:any[] = new Array("Red", "Blue", "Green", "Violet");
					
					trace(ArrayUtil.getIndexOfDifference(color, colorsAlt)); // Traces 3
				</code>
		*/
		public static getIndexOfDifference(first:any[], second:any[], fromIndex:number = 0):number {
			var i:number = fromIndex - 1;
			
			while (++i < first.length)
				if (first[i] != second[i])
					return i;
			
			return -1;
		}
		
		/**
			Creates new Array composed of passed Array's items in a random order.
			
			@param inArray: Array to create copy of, and randomize.
			@return A new Array composed of passed Array's items in a random order.
			@example
				<code>
					var numberArray:any[] = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
					trace(ArrayUtil.randomize(numberArray));
				</code>
		*/
		public static randomize(inArray:any[]):any[] {
			var t:any[]  = new Array();
			var r:any[]  = inArray.sort(ArrayUtil._sortRandom, Array.RETURNINDEXEDARRAY);
			var i:number = -1;
			
			while (++i < inArray.length)
				t.push(inArray[r[i]]);
			
			return t;
		}
		
		protected static _sortRandom(a:any, b:any):number {
			return NumberUtil.randomIntegerWithinRange(0, 1) ? 1 : -1;
		}
		
		/**
			Adds all items in <code>inArray</code> and returns the value.
			
			@param inArray: Array composed only of numbers.
			@return The total of all numbers in <code>inArray</code> added.
			@example
				<code>
					var numberArray:any[] = new Array(2, 3);
					trace("Total is: " + ArrayUtil.sum(numberArray));
				</code>
		*/
		public static sum(inArray:any[]):Number {
			var t:Number = 0;
			var l:number = inArray.length;
			
			while (l--)
				t += inArray[l];
			
			return t;
		}
		
		/**
			Averages the values in <code>inArray</code>.
			
			@param inArray: Array composed only of numbers.
			@return The average of all numbers in the <code>inArray</code>.
			@example
				<code>
					var numberArray:any[] = new Array(2, 3, 8, 3);
					trace("Average is: " + ArrayUtil.average(numberArray));
				</code>
		*/
		public static average(inArray:any[]):Number {
			if (inArray.length == 0)
				return 0;
			
			return ArrayUtil.sum(inArray) / inArray.length;
		}
		
		/**
			Finds the lowest value in <code>inArray</code>.
			
			@param inArray: Array composed only of numbers.
			@return The lowest value in <code>inArray</code>.
			@example
				<code>
					var numberArray:any[] = new Array(2, 1, 5, 4, 3);
					trace("The lowest value is: " + ArrayUtil.getLowestValue(numberArray));
				</code>
		*/
		public static getLowestValue(inArray:any[]):Number {
			return inArray[inArray.sort(16|8)[0]];
		}
		
		/**
			Finds the highest value in <code>inArray</code>.
			
			@param inArray: Array composed only of numbers.
			@return The highest value in <code>inArray</code>.
			@example
				<code>
					var numberArray:any[] = new Array(2, 1, 5, 4, 3);
					trace("The highest value is: " + ArrayUtil.getHighestValue(numberArray));
				</code>
		*/
		public static getHighestValue(inArray:any[]):Number {
			return inArray[inArray.sort(16|8)[inArray.length - 1]];
		}
		
		/**
			Returns an array containing the values of the bojects of inArray for the value of key
			
			@param inArray: Array composed only of numbers.
			@param key: Name of the property to match.
			@example
				<code>
					var inArray:any[] = [
						{a:"a1"},
						{b:"b1"},
						{a:"a2"},
						{a:"a3"},
						{},
						{c:"value c1"},
					];
					
					trace(ArrayUtil.getValuesByKey(inArray, "a"));
				</code>
		*/
		public static getValuesByKey(inArray:any[], key:string):any[] {
			var t:any[] = new Array();
			
			for each (var item:any in inArray)
				if (item && (item[key]))
					t.push(item[key]);
			
			return t;
		}
    }
}