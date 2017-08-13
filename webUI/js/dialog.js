(function($){//创建命名空间
	var Dialog=function(config){
		var _this=this;
		
		
		//默认配置参数
		this.config={
			//对话框的宽度
			width:'auto',
			height:'auto',
			//多个按钮框
			buttons:null,
			//弹出框的类型
			type:null,
			//弹出框的提示文字
			btnText:'是否将该商品加入购物车',
			//弹出框延迟多久关闭
			delay:null,
			//对话框遮罩层透明度
			makOpacity:null
		};
		
		
		//默认参数拓展
		if(config&&$.isPlainObject(config)){//如果有配置参数
			$.extend(this.config,config);
		}else{//如果没有配合参数
			this.isConfig=true;
		}
		
		this.body=$('body');
		this.outer=$('<div class="disloag-outer">');
		this.mask=$('<div class="dialog-container">');
		this.head=$('<div class="dialog-top"></div>');
		this.mid=$('<div class="dialog-mid">');
		this.bot=$('<div class="dialog-bot">');
		//渲染弹出框
		this.create();
		
	}
	Dialog.prototype={//原型链
		
		create:function(){////创建弹出框
			var _this=this;
			config=this.config;
			outer=this.outer;
			mask=this.mask;
			head=this.head;
			mid=this.mid;
			bot=this.bot;
			body=this.body;
			console.log(body)
			
			//如果没有传递参数的时候，就弹出一个默认的等待框
			/*<div class="disloag-outer">
				<div class="dialog-container">
					<div class="dialog-top waiting"></div>
					<div class="dialog-mid">您是否要删除该选项</div>
					<div class="dialog-bot">
						<button class="green">确定</button>
						<button>待定</button>
						<button class="red">取消</button>
					</div>
				</div>
			</div>*/
			console.log(top)
			if(this.isConfig){//什么参数都没传的时候默认显示一个等待框
				body.append(outer);
				outer.append(mask);
				mask.append(head);
			}else{
				//根据配置参数去创建dom
				
				body.append(outer);
				outer.css('background','rgba(0,0,0,'+config.makOpacity+')')
				outer.append(mask);
				mask.css({'width':config.width});
				mask.append(head);
				head.addClass(config.type);
				mask.append(mid);
				mid.text(config.btnText);
				mask.append(bot);
				
				if(config.buttons){
					this.createBtn(bot,config.buttons);
				}
				
				//弹出框弹出多久后消失
				if(config.delay&&config.delay!=0){
					setTimeout(function(){
						_this.close();//可以定义一个方法
//						_this.outer.remove();//也可以直接在这里讲弹出层删除
					},config.delay)
				}
			}
		},
		close:function(){
			this.outer.remove();
		},
		createBtn:function(bot,item){
			var _this_=this;
			$(item).each(function(index){
				//获取按钮的样式，以及回调文本
				var type=this.type?" class='"+this.type+"'":"";
				var text=this.text?this.text:"按钮"+(++index)
				var button=$('<button'+type+'>'+text+'</button>');
				var callback=this.callback?this.callback:null;
				console.log(callback);
				if(callback){
					button.click(function(){//如果传了回调函数，就执行回调函数
						var isClose=callback();//执行回调函数，并且获取回到函数的返回值
						if(isClose!=false){//如果没有返回值就关掉弹出框
							_this_.close();
						}
					})
				}else{//如果没有回调函数，就关闭
					button.click(function(){
						
						console.log(123)
						_this_.close();
					})
					
				}
				
				
				
				bot.append(button);
				mask.append(bot);
			})
			
		}
		
	}
	
	window.Dialog=Dialog;//把组件设置成全局变量
	$.dialog=function(config){
		return new Dialog(config);
	}
	
	
})(Zepto)
