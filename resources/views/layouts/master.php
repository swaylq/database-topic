<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>数据库</title>

    <?php if (isset($assetsPack) AND isset($assetsPack['css'])): ?>
        <?php foreach ($assetsPack['css'] as $css): ?>
            <link href="<?php echo url($css) ?>" rel="stylesheet" media="screen">
        <?php endforeach; ?>
    <?php endif; ?>
    <!--    the g_url, here is the ugly stuff -->
    <script>
        "use strict";
        var g_url = {};
        g_url.site_url = function (url) {
            var site_url = "<?php echo url('')?>";// don't have index.php like ci
            // ltrim the '/'
            if (url.indexOf('/') === 0) {
                url = url.substr(1);
            }
            return site_url + '/' + url;
        };

        g_url.base_url = function (url) {
            var base_url = "<?php echo url('')?>";
            if (url.indexOf('/') === 0) {
                url = url.substr(1);
            }
            return base_url + url;
        };

    </script>
</head>
<body ng-app="axws">
<div id="global-nav" class="navbar navbar-default navbar-fixed-top" ng-controller="SiteNavController" ng-cloak>
    <div class="nav-content">
        <div class="nav navbar-nav navbar-header">
            <li>
                <a href="/" style="text-decoration:none">爱心屋</a>
            </li>
        </div>
        <ul class="nav navbar-nav navbar-left">
            <li>
                <a href="/" ng-class="{'active': active == 'home'}">首页</a>
            </li>
            <li>
                <a href="/goods" ng-class="{'active': active == 'goods'}">商品</a>
            </li>
            <li>
                <a href="/services" ng-class="{'active': active == 'services'}">服务</a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right" id="nav-cart" ng-mouseleave="open=false">
            <li ng-mouseenter="open=true">
                <a class="dropdown-toggle">
                    <i class="fa fa-shopping-cart fa-fw"></i>
                    {{cartService.len}}&nbsp;件商品，
                    <span ng-bind="cartService.total>=0?'共':'获'"></span>
                    <money number="cartService.total"></money>
                </a>
                <ul ng-show="open" id="shopping-cart" class="dropdown-menu" role="menu">
                    <li ng-hide="cartService.len"><a href="#">爱心篮为空</a></li>
                    <li ng-repeat="good in cartService.goods">
                        <div ng-click="redirectDetail(good.id)">{{good.name}}</div>
                        <div ng-click="delGoods(good.id, $index)">
                            <i class="fa fa-trash-o"></i>
                        </div>
                        <div>
                            <number-selector ng-model="good.count" size="sm" max="good.countMax"></number-selector>
                        </div>
                        <div style="clear:both;float:none"></div>
                    </li>
                    <li ng-show="cartService.len" ng-click="order()">
                        <a class="order-btn">立即结算</a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="navbar-right" id="nav-search">
            <div class="form-group">
                <input class="form-control" autocomplete="off" spellcheck="false"
                    ng-model="searchContent" ng-enter="search()" placeholder="{{searchPH}}">
                <i class="fa fa-search" ng-click="search()"></i>
                <i class="fa fa-times" ng-click="clearSearch()" ng-show="searchContent"></i>
            </div>
        </div>
        <ul class="nav navbar-nav navbar-right" id="nav-user">
            <li ng-hide="userService.isLogin">
                <a ng-click="login()">登录</a>
            </li>
            <li ng-show="userService.isLogin">
                <a class="dropdown-toggle">
                    Hi，{{userService.info.name}}&nbsp;~
                </a>
            </li>
            <li dropdown ng-show="userService.isLogin">
                <a class="dropdown-toggle">
                    <i class="fa fa-gear"></i>
                </a>
                <ul id="user-setting" class="dropdown-menu" role="menu">
                    <li><a href="/user_center/info">个人中心</a></li>
                    <li><a ng-click="logOut()">退出登录</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<?php if (isset($header_data['json'])): ?>
    <script>
        <?php
        // json str is not quoted by ' or "
        for($i=0;$i<count($header_data['json']['name']);$i++){
            echo 'var '.$header_data['json']['name'][$i]." = "
            .$header_data['json']['value'][$i].";";
        }
        ?>
    </script>
<?php endif ?>
<?php echo $content ?>

<?php if (isset($assetsPack) AND isset($assetsPack['js'])): ?>
    <?php foreach ($assetsPack['js'] as $js): ?>
        <script type="text/javascript" src="<?php echo url($js) ?>"></script>
    <?php endforeach ?>
<?php endif; ?>
</body>
</html>
