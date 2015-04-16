<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Database</title>

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
<body ng-app="database">
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
