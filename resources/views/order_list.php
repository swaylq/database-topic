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
                    <accordion-group ng-repeat="order in orders">
                        <td>{{order.id}}</td>
                        <td>{{order.consignee_name}}</td>
                        <td>{{order.consignee_address}}</td>
                        <td>{{order.price}}</td>


                    </accordion-group>
                    </tbody>
                </table>
                <tq-page total-items="count" items-per-page="filter.number" callback="changePage($page)"></tq-page>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>
