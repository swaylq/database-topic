<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-13
 * Time: 下午9:18
 */

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder{

    public function run()
    {
        $lastNames = ['张', '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '诸葛', '欧阳', '上官', '司马', '公孙'];
        //$firstNames = ['三', '四', '麻', '光', '缸', '亮', '飞', '奎', '青', '海', '闯', '响', '冲', '子'];

        User::create([
            'name' => 'xsf',
            'password' => sha1('123456'),
            'secrets' => '嘘~'
        ]);

        foreach (range(0, 13) as $i) {
            foreach (range(0, 8) as $j)
            User::create([
                'name' => $lastNames[$i] . $lastNames[$j],
                'password' => sha1('123456'),
                'secrets' => '我姓' . $lastNames[$i]
            ]);
        }
    }
}