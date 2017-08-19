/*
$.extend()的用法：1.深拷贝浅拷贝 2.插件、组件的扩张  3.整合两个对象生成新的对象，有相同属性的后面的会把前面覆盖 
 组件和插件的作用:保证我们的核心代码能被反复使用
插件：偏工具性的方法：$.extend({属性：方法})  这种方法是挂在jq对象上
组件：偏功能的方法：$.fn.extend({属性：方法})  这种方法是挂在jq原型对象上
因为属性值是方法，在调用的时候直接属性名

类级别开发，相当于在jq对象上创建工具性方法:在调用的时候是：$.centerBox($('.box1'))

对象级别插件，在jq的原型对象上添加功能性方法，在调用的时候是：
 1.不传参：$('#box').tabs()
 2.传参：$('#box').tabs({
	'header':['娱乐','八卦','保健','新闻','电影'],
	'content':['张柏芝',"陈冠希","33333",'4444','3d']
});
 */




//动态引入css文件
var link=$('<link rel="stylesheet" type="text/css" href="css/style.css"/>');
$('head').append(link);






(function($){
	
	//类级别开发，相当于在jq对象上创建工具性方法:在调用的时候是：$.centerBox($('.box1'))
	//让盒子居中
	$.extend({
		centerBox:function(obj){
			obj.css({
				'top':($(window).height()-obj.height())/2,
				'left':($(window).width()-obj.width())/2,
				'position':'absolute'
			})
			$(window).resize(function(){
				obj.css({
					'top':($(window).height()-obj.height())/2,
					'left':($(window).width()-obj.width())/2,
					'position':'absolute'
				})
			})
			return obj;//返回对象，让对象还能实现链式调用
		},
		setColor:function(obj){
			obj.css({'width':'200px','height':'200px','background':'pink','color':'#fff','display':'flex','align-items':'center','justify-content':'center'})
		}
		
	})
	
	$.extend({
		leftTrim:function(str){//删除字符串的空格
			return str.replace(/^\s+/,'');
		}
	})
	
	
	
	
	
	
	/*对象级别插件，在jq的原型对象上添加功能性方法，在调用的时候是：
 1.不传参：$('#box').tabs()
 2.传参：$('#box').tabs({
	'header':['娱乐','八卦','保健','新闻','电影'],
	'content':['张柏芝',"陈冠希","33333",'4444','3d']
});*/
	
	var opcation = {  //默认参数
		'header':['一','二','三'],
		'content':['1111',2222,33333]
	}
	
	var setting={};//整合后的参数
	var $parent = null;
	function tab(obj){ //实例化式传进来的参数
		$.extend(setting, opcation,obj);//覆盖参数
		$parent = this;
		creatInput();
		creatDiv();
		change();
		console.log(setting)
	}
	
	function creatInput(){		
	/*	setting.header.forEach(function(item,index){
			var inp = $('<input type="button">');
			inp.val(item);
			if(index==0){
				inp.addClass('active');
			}
			$parent.append(inp);
		})*/
		for(var i=0;i<setting.header.length;i++){
			var inp = $('<input type="button">');
			inp.val(setting.header[i]);
			if(i==0){
				inp.addClass('active');
			}
			$parent.append(inp);
		}
	}
	
	function creatDiv(){
		for(var i=0;i<setting.header.length;i++){
			var divs = $('<div>');
			divs.html(setting.content[i]);
			if(i==0){
				divs.addClass('show');
			}
			$parent.append(divs);
		}
	}
	
	
	function change(){
		var inputs = $parent.find('input');
		var divs = $parent.find('div');
		inputs.on('click',function(){
			var num = $(this).index('input');
			$(this).addClass('active').siblings('input').removeClass('active');
			$('#box div').eq(num).show().siblings('div').hide();
		})
		
	}
	
	$.fn.extend({//把组件挂到jq原型链上去
		tabs:tab,
		change:function(){//这是挂到jq原型对象上的方法，所有元素都可以直接调用该方法
			$(this).width(300);
			$(this).height(200);
			$(this).css({'background':'#ccc','color':'red'});
			return this;
		},
		center:function(){//让调用的元素始终在屏幕中间
			$(this).parent().css({'position':'relateive'});
			$(this).css({'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)'})
		}
	})
	
	
})(jQuery)
			