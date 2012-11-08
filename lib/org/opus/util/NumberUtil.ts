module opus {
    export class NumberUtil{
    	/**
			Determines if index is included within the collection length otherwise the index loops to the beginning or end of the range and continues.
			
			@param index: Index to loop if needed.
			@param length: The total elements in the collection.
			@return A valid zero-based index.
			@example
				<code>
					var colors:Array = new Array("Red", "Green", "Blue");
					
					trace(colors[NumberUtil.loopIndex(2, colors.length)]); // Traces Blue
					trace(colors[NumberUtil.loopIndex(4, colors.length)]); // Traces Green
					trace(colors[NumberUtil.loopIndex(-6, colors.length)]); // Traces Red
				</code>
		*/
		public static loopIndex(index:number, length:number):number {
			if (index < 0)
				index = length + index % length;
			
			if (index >= length)
				return index % length;
			
			return index;
		}
		
		/**
			Formats a number.
			
			@param value: The number you wish to format.
			@param minLength: The minimum length of the number.
			@param thouDelim: The character used to seperate thousands.
			@param fillChar: The leading character used to make the number the minimum length.
			@return Returns the formated number as a String.
			@example
				<code>
					trace(NumberUtil.format(1234567, 8, ",")); // Traces 01,234,567
				</code>
		*/
		public static format(value:number, minLength:number, thouDelim:string = null, fillChar:string = "0"):string {
			var num:string = value.toString();
			var len:number = num.length;
			
			if (thouDelim != null) {
				var numSplit:string[] = num.split('');
				var counter:number = 3;
				var i:number       = numSplit.length;
				
				while (--i > 0) {
					counter--;
					if (counter == 0) {
						counter = 3;
						numSplit.splice(i, 0, thouDelim);
					}
				}
				
				num = numSplit.join('');
			}
			
			if (minLength != 0) {
				if (len < minLength) {
					minLength -= len;
					
					while (minLength--){
						num = fillChar + num;
					}
				}
			}
			
			return num;
		}
	}
}