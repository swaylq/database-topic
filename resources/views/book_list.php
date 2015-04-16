<div class="wrap">
    <div class="center">
        <ul class="col-xs-2 nav nav-pills nav-stacked" id="global-nav">
            <li><a href="/">HOME</a></li>
            <li><a href="/book/list">BOOKS</a></li>
            <li><a href="/order/list">ORDERS</a></li>
            <li><a>EXIT</a></li>
        </ul>
        <div class="col-xs-10" ng-controller="ListController">
            <div class="title">
                Books
            </div>
            <div class="content">
                <div ng-repeat="book in books">
                    
                </div>
            </div>
        </div>
        <div class="clear:float"></div>
    </div>
</div>
