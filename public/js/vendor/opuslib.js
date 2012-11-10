(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.opuslib = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.Logo();
	this.instance.setTransform(167.7,40.1,1,1,0,0,0,167.7,40.1);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-8.2,-1.1,343.7,87.7);


// symbols:
(lib.Symbol1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#0099E6","#33CCE6"],[0,1],-8.2,0,8.2,0).s().p("AAABTIAAhTIhSAAQAAghAYgZQAZgYAhAAIAABSIBTAAQAAAigZAYQgYAZgiAAIAAAA").cp();

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-8.2,-8.2,16.6,16.6);


(lib.LogoFront = function() {
	this.initialize();

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#0087CC","#33CCE6"],[0,1],-0.4,47.4,-0.4,-47.8).s().p("AZkgBIAAABQAABLgaBEIAAgCQgcBFgyAzQg0AzhFAeQhEAfhVAAQhUAAhEgfQhFgcgyg1QgygxgdhFIACACQgchEAAhMIAAgBQAAhMAchDIgCAAQAdhEA0gyQAyg1BFgeQBEgcBUAAQBVAABEAcQBFAcAyA1QAyAyAcBFQAaBCAABNIAAAAAYCAAQAAg6gUg1QgUg3glgnQgmgmg0gYQg0gZg9AAQg8AAg0AZQgzAYgkAmQgmApgSA0QgUAyAAA9IAAABQAAA6AUA1QASA2AmAnQAnAlAyAZQA0AYA8AAQA9AAA0gYQAygWAmgoQAlgpAUgyIgCAAQAWg0AAg8IAAgBAJ3kgIg6BHQgQgMgOgKIgCAAQgZgQgYgMIgCAAQgagMgggHQgggGgmAAQg5AAgwAZQgyAYgiAoIAAgCQgnAngSA3QgUAzAAA7IAAABQAAA9AUA2QASA2AnAnQAkAmAyAWQA0AWA/AAQA6AAAygQIACAAQAwgSAlgcIAIgGIAAirIjBAAIAAhLIEbAAIAAEiQgYASgcASQgiAUgkAQQgpAOgqAMIAAgCQgsALgwAAQhVAAhGgdQhFgcgwgyQgwgygahDQgahHAAhNIAAgBQAAhMAahDQAahEAwgyQAyg1BFgeQBEgcBTAAQAwAAAmAHQAmAHAkANQAhALAcASQAWAMAUAQIAAAAAjQgBIAAABQAABLgaBEIAAgCQgcBFgyAzQg0AzhFAeQhEAfhVAAQhUAAhEgfQhFgcgyg1QgygxgchFIACACQgdhEAAhMIAAgBQAAhMAdhDIgCAAQAchEA0gyQAyg1BFgeQBEgcBUAAQBVAABEAcQBFAcAyA1QAyAyAcBFQAaBCAABNIAAAAAkyAAQAAg6gUg1QgUg3gkgnQgngmg0gYQg0gZg9AAQg8AAg0AZQgyAYglAmQgmApgSA0QgUAyAAA9IAAABQAAA6AUA1QASA2AmAnQAnAlAyAZQA0AYA8AAQA9AAA0gYQAygWAngoQAkgpAUgyIgCAAQAWg0AAg8IAAgBA4HloIAAJ+IGQAAIAABQInsAAIAArOIBcAA").cp();
	this.shape_1.setTransform(167.7,40.2);

	this.addChild(this.shape_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(4,2.9,327.4,74.6);


(lib.LogoBack = function() {
	this.initialize();

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#0099E6","#33CCE6"],[0,1],-0.5,47.4,-0.5,-47.8).s().p("AFwmcQhbAAhMAgQhNAjg2A4Qg4A2gaBPQgfBIAABUIAAABQAABWAfBMQAaBNA4A2QA0A2BNAhIAAACQBOAeBdAAQA0AAAwgKQAugKArgQQAqgTAkgWIgCAAQAkgWAegYIAGgGIAAlcIlsAAIAACbIDBAAIAABvQgeAUgkAOQguAOgyAAQg3AAgsgSQgqgSgegjQgggigRgsQgSgwAAg1IAAgBQAAgzASgsQARguAggiQAcgjAsgUQAmgUAxAAQAiAAAcAGQAcAGAWAIQAWAMAWAMQAXAQAWATIAQAMIBsiDIgOgMQgegcgigSQgegUgkgPIgCAAQglgOgqgIQgqgGg0AAIAAAAAaNgBQAAhVgdhIIAAgCIgCAAQgghNg2g2Qg2g4hNghQhMgghdAAQhcAAhNAgQhMAjg2A4Qg5A2ggBNIAAACQgeBIAABUIAAABQAABUAeBKQAgBNA3A2QA2A4BMAhQBNAiBcAAQBdAABMgiQBNgjA4g2QA2g4AghNIACAAQAdhKAAhTIAAgBASKjnQAsgUA0AAQA1AAAsAUQAsAUAgAjQAeAiATAuQASAuAAAyIAAABQAAA0gSAsIAAACQgTAsgeAgIAAACQggAjgqASQgsAUg1AAQg0AAgsgUIACAAQgsgUgjgjIACAAQgggigQgsQgSguAAgzIAAgBQAAg1ASgsQAQguAgggQAfgjAsgUIgCAAAjDigIgCAAQghhNg2g2Qg3g4hMghQhMgghdAAQhcAAhMAgQhNAjg2A4Qg5A2ggBNIAAACQgeBIAABUIAAABQAABUAeBKQAgBNA3A2QA2A4BMAhQBNAiBcAAQBdAABMgiQBNgjA4g2QA2g4AhhNIACAAQAchKAAhTIAAgBQAAhVgchIIAAgCAlaAAIAAABQAAA0gSAsIAAACQgSAsgfAgIAAACQggAjgqASQgsAUg1AAQg0AAgsgUIACAAQgsgUgigjIABAAQgggigQgsQgSguAAgzIAAgBQAAg1ASgsQAQguAgggQAegjAtgUIgCAAQAsgUA0AAQA1AAAsAUQAsAUAgAjQAfAiASAuQASAuAAAyIAAAAA6MmQIAAMfII9AAIAAihImPAAIAAp+IiuAA").cp();
	this.shape_2.setTransform(167.7,40.1);

	this.addChild(this.shape_2);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-1.1,335.4,82.7);


(lib.Twirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// Layer 2
	this.instance = new lib.Symbol1();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:120},10).to({rotation:240.1},10).to({scaleX:1,scaleY:1,rotation:348.1},9).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.2,-8.2,16.6,16.6);


(lib.Logo = function() {
	this.initialize();

	// Layer 3
	this.instance_1 = new lib.Twirl();
	this.instance_1.setTransform(14.2,40.8,1,1,-74.9);

	this.instance_2 = new lib.Twirl();
	this.instance_2.setTransform(92.7,61.2,1,1,90);

	this.instance_3 = new lib.Twirl();
	this.instance_3.setTransform(171.6,49.1,1,1,-14.9);

	this.instance_4 = new lib.Twirl();
	this.instance_4.setTransform(267.3,21.2,1,1,-59.9);

	this.instance_5 = new lib.Twirl();
	this.instance_5.setTransform(228.1,44.2,1,1,-44.9);

	this.instance_6 = new lib.Twirl();
	this.instance_6.setTransform(320,25.3,1,1,-149.9);

	// LogoFront
	this.instance_7 = new lib.LogoFront();
	this.instance_7.setTransform(167.7,40.1,1,1,0,0,0,167.7,40.1);
	this.instance_7.shadow = new cjs.Shadow("rgba(0,0,0,1)",4,4,5);

	// Layer 2
	this.instance_8 = new lib.Twirl();
	this.instance_8.setTransform(272.1,49.1,1,1,105);

	this.instance_9 = new lib.Twirl();
	this.instance_9.setTransform(201,78.2,1,1,-89.9);

	this.instance_10 = new lib.Twirl();
	this.instance_10.setTransform(174.2,14.2,1,1,165);

	this.instance_11 = new lib.Twirl();
	this.instance_11.setTransform(80.8,10.2,1,1,120);

	this.instance_12 = new lib.Twirl();
	this.instance_12.setTransform(54,64.6,1,1,135);

	this.instance_13 = new lib.Twirl();
	this.instance_13.setTransform(3.1,13.8,1,1,30);

	// LogoBack
	this.instance_14 = new lib.LogoBack();
	this.instance_14.setTransform(167.7,40.1,1,1,0,0,0,167.7,40.1);

	this.addChild(this.instance_14,this.instance_13,this.instance_12,this.instance_11,this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-8.2,-1.1,343.7,87.7);

})(opuslib = opuslib||{}, images = images||{}, createjs = createjs||{});
var opuslib, images, createjs;