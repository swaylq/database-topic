<div class="wrap">
    <div class="center">
        <ul class="col-xs-2 nav nav-pills nav-stacked" id="global-nav" ng-controller="SiteNavController">
            <li><a href="/">HOME</a></li>
            <li><a href="/book/list">BOOKS</a></li>
            <li><a href="/order/list">ORDERS</a></li>
            <li><a ng-click="exit()">EXIT</a></li>
        </ul>
        <div class="col-xs-10">
            <div class="title">
                Home
            </div>
            <div class="content" ng-controller="HomeController">

                <h1>The presentation of our group</h1>
                <h3>A web application to contrast the mongdb and mysql</h3>
                <br>
                成员列表
                <ul style="padding-left:15px;font-family:'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans', 'Hiragino Sans GB', 'Source Han Sans CN Normal', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;">
                    <li>刘乾</li>
                    <li>徐盛福</li>
                    <li>俞汤达</li>
                    <li>陈石</li>
                </ul>
                <br>
                <h5>The current database is {{database}}</h5>
                <br>
                <div class="btn btn-primary" ng-click="changeDatabase()">
                    change the database
                </div>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>
