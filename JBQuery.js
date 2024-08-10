var JBQuery = function(selector){

				if((selector instanceof HTMLElement)){
					selector = [selector];
				} else if (selector instanceof Object && selector.JB == true){
					selector = selector.Items;
				} else if(selector.constructor !== Array){
					selector = document.querySelectorAll(selector);
				}

				var TestUI = new Object();

				TestUI.JB = true;
				TestUI.Items = selector;



				function iterate(fun){
					for(var i = 0; i < TestUI.Items.length; i++){
						fun(TestUI.Items[i]);
					}
				}
				function newTestUI(){
					return Object.assign({}, TestUI);
				}

				TestUI.getElements = function(){
					var items = [];
					iterate(function(item){
						var x = newTestUI();
						x.Items = item;
						items.push(x);
					});
					return items;
				};

				TestUI.Print = function(){
					iterate(function(item){
						console.log(item.innerText);
					});
					return TestUI;
				};
				TestUI.Parents = function(){
					var parents = [];
					iterate(function(item){
						var x = newTestUI();
						x.Items = item.parentNode;
						parents.push(x);
					});
					return parents;
				};
				TestUI.Destroy = function(){
					iterate(function(item){
						item.parentNode.removeChild(item);
					});
					return TestUI;
				};
				TestUI.manipulate = function(animate, duration){
					return TestUI;
				};
				TestUI.setStyle = function(styles){
					iterate(function(item){
						item.setAttribute('style', styles);
					});
					return TestUI;
				};

				JBQuery.bindDollar = function(){
					window.$ = function(item){
						return JBQuery(item);
					};
				};

				return TestUI;
			};



			JBQuery.bindDollar();


			$($('p').getElements()[0]).setStyle('color:green');
