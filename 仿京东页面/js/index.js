window.onload = function () {
    // ajax("get", "helloworld.json", function (res) {
    //     console.log(res);
    // }, true)



    // 搜索框
    var searchInput = document.getElementById("searchInput")
    searchInput.addEventListener("keyup", debounce(getSuggest, 1000), false)
    searchInput.addEventListener("blur", hideKeyword, false)
    searchInput.addEventListener("focus", showKeyword, false)
    // 搜索框之显示提示
    function showKeyword() {
        if (searchInput.value !== "") {
            // getSuggest()
            document.getElementById("search-suggest").style.display = "block"
        }
    }
    // 搜索了之隐藏提示
    function hideKeyword() {
        document.getElementById("search-suggest").style.display = "none"
    }

    // 接口获取提示列表

    function getSuggest() {
        ajax('get', 'suggest.json', function (res) {
            console.log(res);
            if (res.code == 0) {
                console.log(res)
                var suggest_list = document.getElementById("search-suggest")
                var data = res.data
                var str = ""
                for (var i = 0; i < data.length; i++) {
                    str += "<li>" + data[i].suggestname + "</li>"
                }
                console.log(str);
                suggest_list.innerHTML = str
                // 调用显示提示的内容
                showKeyword();
            }
        }, true)
    }

    // 防抖函数
    function debounce(fn, delay) {
        var handle;
        return function () {
            clearTimeout(handle)
            handle = setTimeout(function () {
                fn()
            }, delay)
        }
    }



    // 轮播图
    bannerOption();

    function bannerOption() {
        var swiper = document.getElementById("swiper") // 获取轮播图包裹层元素
        var swiperItem = swiper.getElementsByClassName("swiper-item") // 获取轮播如列表
        var prev = document.getElementsByClassName("prev")[0] // 获取上一张按钮
        var next = document.getElementsByClassName("next")[0] // 获取下一张按钮
        var indicators = document.getElementsByClassName("indicator") //获取圆点
        var index = 0 // 当前轮播图索引
        var timer = null // 定时器

        // 设置轮播图的位移和透明度
        for (let i = 0; i < swiperItem.length; i++) {
            if (index % 3 == i) {
                swiperItem[i].style.opacity = 1
            } else {
                swiperItem[i].style.opacity = 0
            }
            swiperItem[i].style.transform = "translateX(" + (-i * swiperItem[0].offsetWidth) + "px)"
        }


        // 给圆点添加点击事件
        for (var k = 0; k < indicators.length; k++) {
            clearInterval(timer)
            indicators[k].onclick = function () {
                var clickIndex = parseInt(this.getAttribute("data-index"))
                index = clickIndex
                changeImg()
            }
        }

        // 给左右添加点击事件
        prev.onclick = function () {
            clearInterval(timer)
            index--;
            changeImg()
        }
        next.onclick = function () {
            clearInterval(timer)
            index++
            changeImg()
        }
        // 更换图片
        function changeImg() {
            if (index < 0) {
                index = swiperItem.length - 1
            } else if (index > swiperItem.length - 1) {
                index = 0
            }
            for (let j = 0; j < swiperItem.length; j++) {
                swiperItem[j].style.opacity = 0;
            }
            swiperItem[index].style.opacity = 1
            // 激活圆点
            setIndicatorOn()
        }

        function setIndicatorOn() {
            for (var i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove("on")
            }
            indicators[index % 3].classList.add("on")

        }

        autoChange()
        // 自动更换图片
        function autoChange() {
            timer = setInterval(function () {
                index++;
                changeImg()
            }, 2000)
        }
        swiper.addEventListener("mouseover", function () {
            clearInterval(timer)
        }, false)
        swiper.addEventListener("mouseout", function () {
            autoChange()
        }, false)
    }


    // 秒杀倒计时
    var ms_time = 70;
    var ms_timer = setInterval(function () {
        if (ms_time < 0) {
            clearInterval(ms_timer);
        } else {
            calTime(ms_time);
            ms_time--
        }
    }, 1000)

    function calTime(time) {
        var hour = Math.floor(time / 60 / 60); // 小时
        var minutes = Math.floor(time / 60 % 60); // 分钟
        var second = Math.floor(time % 60); // 秒
        hour = formatTime(hour)
        minutes = formatTime(minutes)
        second = formatTime(second)
        document.getElementsByClassName("cd_hour")[0].innerHTML = hour
        document.getElementsByClassName("cd_minute")[0].innerHTML = minutes
        document.getElementsByClassName("cd_second")[0].innerHTML = second
    }

    function formatTime(t) {
        if (t < 10) {
            t = "0" + t
        }
        return t
    }


}