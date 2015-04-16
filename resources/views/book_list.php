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
            <div class="btn btn-primary" style="position:absolute;right:15px;top:0px" ng-click="postOrder()">
                下订单
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
                <pagination total-items="count" max-size="5" boundary-links="true" rotate="false" previous-text="上一页" next-text="下一页" ng-model="filter.page" items-per-page="filter.number"></pagination>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>

<script type='text/ng-template' id='order.html'>
    <div class="modal-header">
        填写收货人
        <button ng-click="cancel()" type="button" class="close"><span>&times;</span><span class="sr-only">Close</span></button>
    </div>
    <div class="modal-body">
        <form class="form-horizontal" ng-submit="postOrder()">
            <form-group form-obj="order" form-name="姓名" form-placeholder="请输入您的姓名" form-key="consignee_name" form-validate="{min: 0, max: 200}">
            </form-group>
            <form-group form-obj="order" form-name="地址" form-placeholder="请输入您的地址" form-key="consignee_address" form-validate="{min: 0, max: 200}">
            </form-group>
            <div class="form-group" style="margin-bottom:0px;">
                <div class="col-sm-offset-2 col-sm-2">
                    <button class="btn blue-btn" type="submit">确定</button>
                </div>
            </div>
        </form>
    </div>
</script>
