<div class="center" ng-controller="LoginController">
    <br><br><br><br><br><br>
    <form class="form-horizontal" ng-submit="login()">
        <form-group form-obj="user" form-name="用户名" form-placeholder="请输入您的姓名" form-key="name" form-validate="{min: 0, max: 200}">
        </form-group>
        <form-group form-obj="user" form-name="密码" form-placeholder="请输入您的密码" form-key="pwd" form-validate="{min: 0, max: 200}" form-type="password">
        </form-group>
        <div class="form-group" ng-show="errorMsg">
            <div class="col-sm-offset-2 col-sm-5">
                <div class="help-block custom-red">{{errorMsg}}</div>
            </div>
        </div>
        <div class="form-group" style="margin-bottom:0px;">
            <div class="col-sm-offset-2 col-sm-2">
                <button class="btn blue-btn" type="submit">登录</button>
            </div>
        </div>
    </form>
</div>
