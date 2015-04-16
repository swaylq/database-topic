<div class="wrap">
    <div class="center">
        <ul class="col-xs-2 nav nav-pills nav-stacked" id="global-nav" ng-controller="SiteNavController">
            <li><a href="/">HOME</a></li>
            <li><a href="/book/list">BOOKS</a></li>
            <li><a href="/order/list">ORDERS</a></li>
            <li><a ng-click="exit()">EXIT</a></li>
        </ul>
        <div class="col-xs-10" ng-controller="OrderListController">
            <div class="title">
                Orders
            </div>
            <div class="content">
                <table class="table">
                    <thead>
                    <th>订单号</th>
                    <th>订购人</th>
                    <th>订单地址</th>
                    <th>价格</th>
                    </thead>
                    <tbody>
                    <tr ng-repeat="order in orders">
                        <td>{{order.id}}</td>
                        <td>{{order.consignee_name}}</td>
                        <td>{{order.consignee_address}}</td>
                        <td>{{order.price}}</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <div class="btn btn-default pull-left" ng-disabled="filter.page == 1" ng-click="filter.page = filter.page - 1;changePage();">上一页</div>
                    <div class="help-block pull-left">&nbsp;&nbsp;&nbsp;&nbsp;当前第{{filter.page}}页, 共有{{count}}项数据, &nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div class="btn btn-default pull-left" ng-disabled="filter.page == count" ng-click="filter.page = filter.page + 1;changePage();">下一页</div>
                    <div class="clear:float"></div>
                </div>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>
