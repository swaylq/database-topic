<div class="wrap">
    <div class="center">
        <ul class="col-xs-2 nav nav-pills nav-stacked" id="global-nav" ng-controller="SiteNavController">
            <li><a href="/">HOME</a></li>
            <li><a href="/book/list">BOOKS</a></li>
            <li><a href="/order/list">ORDERS</a></li>
            <li><a ng-click="exit()">EXIT</a></li>
        </ul>
        <div class="col-xs-10" ng-controller="ListController">
            <div class="title">
                Books
            </div>
            <div class="content">
                <table class="table">
                    <thead>
                        <th>选择</th>
                        <th>书名</th>
                        <th>作者</th>
                        <th>价格</th>
                        <th>库存</th>
                        <th>数量</th>
                    </thead>
                    <tbody>
                        <tr ng-repeat="book in books">
                            <td><input type="checkbox" ng-model="book.check"></td>
                            <td>{{book.name}}</td>
                            <td>{{book.author}}</td>
                            <td>{{book.price}}</td>
                            <td>{{book.stock}}</td>
                            <td><input style="width: 50px;height: 20px;" type="number" ng-model="book.number"></td>
                        </tr>
                    </tbody>
                </table>
                <tq-page total-items="count" items-per-page="filter.number" callback="changePage($page)"></tq-page>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>
