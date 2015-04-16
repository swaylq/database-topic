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
                    <th>订购人</th>
                    <th>订单地址</th>
                    <th>价格</th>
                    </thead>
                    <tbody>
                    <tr ng-repeat="order in orders" ng-click="showBooks(order.books)">
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
<script type='text/ng-template' id='books.html'>
    <div class="modal-header">
        订单详情
        <button ng-click="cancel()" type="button" class="close"><span>&times;</span><span class="sr-only">Close</span></button>
    </div>
    <div class="modal-body">
        <table class="table">
            <thead>
                <th>书名</th>
                <th>作者</th>
                <th>价格</th>
                <th>数量</th>
            </thead>
            <tbody>
                <tr ng-repeat="book in books">
                    <td>{{book.name}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.price}}</td>
                    <td>{{book.number}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</script>
