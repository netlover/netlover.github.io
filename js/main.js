var Tips = (function(){

	var $tipBox = $(".tips-box");

	var bind = function(){

	}

	bind();
	return {
		show: function(){
			$tipBox.removeClass("hide");
		},
		hide: function(){
			$tipBox.addClass("hide");
		},
		init: function(){

		}
	}
})();

var Main = (function(){

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			//var num = parseInt(Math.random()*5+1);
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var aside = function(){
		var $left = $(".left-col"),
			$aside = $(".aside"),
			$close = $aside.find("a.close"),
			$open = $aside.find("a.open"),
			$main = $(".mid-col"),
			speed = 300,
			count = 0;
		$close.off("click").on("click",function(){
			if(count === 0){
				$left.animate({ left: "-240px" }, speed);
			}else{
				$left.animate({ left: "-240px" }, 0);
			}
			count++;
			$aside.animate({ left: "10px" }, speed, function(){
				$close.hide();
				$open.show();
			});
			$main.animate({ left: 0}, speed);
			//aside();
		});
		$open.off("click").on("click",function(){
			$left.animate({ left: 0 }, 0);
			$aside.animate({ left: "250px" }, speed, function(){
				$close.show();
				$open.hide();
			});
			$main.animate({ left: "240px"}, speed);
			//aside();
		});
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}

	var fancyInit = function(){

		var isFancy = $(".isFancy");

		if(isFancy.length != 0){
			var imgArr = $(".article-inner img");
			for(var i=0,len=imgArr.length;i<len;i++){
                if($(imgArr[i]).parents(".gallery").length>=1){

                    break;
                }
				var src = imgArr.eq(i).attr("src");
				var title = imgArr.eq(i).attr("alt");
				imgArr.eq(i).replaceWith("<a href='"+src+"' title='"+title+"' rel='fancy-group' class='fancy-ctn fancybox'><img src='"+src+"' title='"+title+"'></a>");
			}
			$(".article-inner .fancy-ctn").fancybox();
		}
	}

	var enterAnm = function(){
		//avatar
		$(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
		$(".js-avatar")[0].onload = function(){
			$(".js-avatar").addClass("show");
		}

		//article
		/* function showArticle(){
			$(".article").each(function(){
				if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && !$(this).hasClass('show') ) {
					$(this).addClass("show");
				}
				if($(this).offset().top<$(window).height()){
				    $(this).addClass("show");
				}
			});
		}
		$(window).on('scroll', function(){
			showArticle();
		});
		showArticle(); */
	}

	return {
		init: function(){
			resetTags();
			bind();
			aside();
			enterAnm();
			fancyInit();
			Tips.init();
			new Mobile({
				ctn: document.getElementsByClassName("slider-trigger")[0]
			});
		}
	}
})();

$(Main.init());
