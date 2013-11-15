/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("touchmove", function (e) { e.preventDefault(); return false; }, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      
        console.log('Received Event: ' + id);
		
		// 設定畫布
		canvas = document.getElementById("canvas1");
		cx = canvas.getContext("2d");
		
		/*
		var bg = new Image();
		bg.onload = function() {
			cx.drawImage( bg, 0, 0, 1024, 768);	
		};
		bg.src = "img/bg.jpeg";
		*/
		/*
		var posX = 300;
		var posY = 300;
		var spongebobW = 290;
		var spongebobH = 370;
		
		cx.beginPath();
		cx.rect(posX, posY, spongebobW, spongebobH);
		cx.clip();
		var image = new Image();
		image.onload = function() {
			cx.drawImage( image, posX, posY, spongebobW, spongebobH);	
		};
		image.src = "img/s1.png";
		*/
		var old_angle = 0;
	
		
		canvas.addEventListener("touchstart", function(evt) {
			
			evt.preventDefault();
			
			var toucn_num = evt.touches.length;
			
			console.log("touchmove:" + toucn_num );
			/*
			for( var i=0; i<toucn_num; i++ ) {
				console.log( evt.touches[i].pageX + "," + evt.touches[i].pageY );
			}
			*/
			var min_dis = 999;
			var old_sP={x:0, y:0};
			var old_tP={x:0, y:0};
			var diff_x = 0;
			var diff_y = 0;
			if( toucn_num == 4 ) {
	
				for(var i=0; i<toucn_num; i++ ) {
					
					x1 = evt.touches[i].pageX;
					y1 = evt.touches[i].pageY;
					
					for( var j=toucn_num-1; j>i; j-- ) {
						
						x2 = evt.touches[j].pageX;	
						y2 = evt.touches[j].pageY;
						
						var sP={x:x1,y:y1};
						var tP={x:x2,y:y2};
						var dis = Math.floor( app.getDistance(sP,tP) );
						//console.log( dis );
						
						if( dis < min_dis ) {
							
							min_dis = dis;
							
							if( x1 >= x2 ) {
								old_sP.x = x1;
								old_sP.y = y1;
								old_tP.x = x2;
								old_tP.y = y2;
								diff_x = Math.floor(( x1 - x2 ) / 2);
								diff_y = Math.floor(( y1 - y2 ) / 2);
							} else {
								old_sP.x = x2;
								old_sP.y = y2;
								old_tP.x = x1;
								old_tP.y = y1;
								diff_x = Math.floor(( x2 - x1 ) / 2);
								diff_y = Math.floor(( y2 - y1 ) / 2);
							}
						}
					}
				}
				
				
				var angle = app.ConvertPositionAngel(old_tP.x, old_sP.x, old_tP.y, old_sP.y);
				//var angle = Math.floor( app.convertPositionAngel(old_sP,old_tP) );
				
				var new_angle = angle - old_angle;
				old_angle = angle;
				
				console.log( "angle(" + angle + ") new_angle(" + new_angle + ")" );
			
				
				var spongebobW = 290;
				var spongebobH = 370;
				
				/*
				cx.save();
				cx.strokeStyle = "rgba(255, 255, 255, 1)";
				cx.lineWidth = 10;
				cx.lineCap = "round";
				cx.beginPath();
				cx.moveTo(old_sP.x, old_sP.y);						
				cx.lineTo(old_tP.x, old_tP.y);
				cx.stroke();
				cx.restore();
				*/
				
				console.log( diff_x + "," + diff_y );
				
				cx.translate(old_tP.x + diff_x, old_tP.y);
				cx.rotate(new_angle * Math.PI /180);
				cx.translate(-(old_tP.x + diff_x), -old_tP.y);
				
				//cx.save();
				var image = new Image();
				image.onload = function() {
					cx.drawImage( image, old_tP.x - diff_x, old_tP.y, spongebobW, spongebobH);	
				};
				image.src = "img/s1.png";
				//cx.restore();
				
				
				
				
				/*			
				for(var i=0; i<toucn_num; i++ ) {
					
					x1 = evt.touches[i].pageX;
					y1 = evt.touches[i].pageY;
					
					for( var j=toucn_num-1; j>i; j-- ) {
						
						x2 = evt.touches[j].pageX;	
						y2 = evt.touches[j].pageY;
						
						var sP={x:x1,y:y1};
						var tP={x:x2,y:y2};
						var dis = Math.floor( app.getDistance(sP,tP) );
						console.log( dis );
						
						
						if( dis < 250 ) {
							
							cx.strokeStyle = "rgba(255, 255, 255, 1)";
							cx.lineWidth = 10;
							cx.lineCap = "round";
							cx.beginPath();
							cx.moveTo(x1, y1);						
							cx.lineTo(x2, y2);
							cx.stroke();
						}	
					}
				}
				*/
			}
			
			// 清除螢幕 
			var clearObj = document.getElementById("clear_btn");
			clearObj.addEventListener("touchend", function(evt) {
				console.log("clear");
				cx.clearRect(0, 0, 1024, 768);
			}, false);
				
			/*
			if( evt.touches.length == 4 )
			{	
				for(var i=0; i<4; i++ ) {
					
					x1 = evt.touches[i].pageX;
					y1 = evt.touches[i].pageY;
					
					for( var j=3; j>i; j-- ) {

						x2 = evt.touches[j].pageX;	
						y2 = evt.touches[j].pageY;

						var sP={x:x1,y:y1};
						var tP={x:x2,y:y2};
						var dis = Math.floor( app.getDistance(sP,tP) );
						
						console.log( dis + "=" + evt.touches[i].pageX + "," + evt.touches[i].pageY + "|" + evt.touches[j].pageX + "," + evt.touches[j].pageY );
						
						
						
						if( dis < 200 ) {
							
							cx.strokeStyle = "rgba(255, 255, 255, 1)";
							cx.lineWidth = 10;
							cx.lineCap = "round";
							cx.beginPath();
							cx.moveTo(x1, y1);						
							cx.lineTo(x2, y2);
							cx.stroke();
							cx.closePath();
						}
						
					}
				}
	
			}
			*/
			
		}, false);

		
    },
	// 目標與原點的角度
	convertPositionAngel: function(soucePoint,targetPoint) {

		var res=(Math.atan2(targetPoint.y-soucePoint.y,targetPoint.x-soucePoint.x)) / Math.PI * 180.0;
		return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
	},
	// 2點間距離
	getDistance: function(soucePoint,targetPoint) {

		var x1 = soucePoint.x;
		var y1 = soucePoint.y;
		var x2 = targetPoint.x;
		var y2 = targetPoint.y;
		var xdiff = x2 - x1;
		var ydiff = y2 - y1;
		return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
	},
	ConvertPositionAngel: function(x1, x2, y1, y2){
     	var res=(Math.atan2(y2-y1,x2-x1)) / Math.PI * 180.0;
     	return Math.floor( res );//(res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
  	}
};
