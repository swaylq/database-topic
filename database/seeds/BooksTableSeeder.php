<?php
/**
 * Created by PhpStorm.
 * User: xsf
 * Date: 15-4-13
 * Time: 下午9:18
 */

use Illuminate\Database\Seeder;
use App\Book;

class BooksTableSeeder extends Seeder{

    public function run()
    {
        $booksFile = fopen(__DIR__ . "/books.txt", 'r');

        $count = 0;
        $booksInfo = [];
        while (!feof($booksFile)) {
            $line = trim(fgets($booksFile), PHP_EOL);
            $bookInfo = $this->_getBookInfo($line);
            if ($bookInfo) {
                $count = $count + 1;
                $booksInfo[] = $bookInfo;
                Book::create([
                    'name' => $bookInfo['name'] . '[1]',
                    'author' => $bookInfo['author'],
                    'price' => 9.9,
                    'cover' => '/iamges/nocover.jpg',
                    'intro' => '只要9块9',
                    'stock' => '444'
                ]);
            }
        }
        fclose($booksFile);

        if (empty($booksInfo)) {
            echo "没有数据";
            return ;
        }

        foreach (range(2, 10000) as $index) {
            echo "\r" . '进度： ' . $index / 100 . '%                 ';

            foreach ($booksInfo as $book) {
                Book::create([
                    'name' => $book['name'] ."[{$index}]",
                    'author' => $book['author'],
                    'price' => 9.9,
                    'cover' => '/iamges/nocover.jpg',
                    'intro' => '只要9块9',
                    'stock' => '444'
                ]);
            }
        }
    }

    private function _getBookInfo($line)
    {
        $unChar = array('《', '》', '（', '）', '，', '：', '　');
        $char = array('<', '>', '(', ')', ',', ':', ' ');
        $line = str_replace($unChar, $char, $line);

        $nameL = strpos($line, '<');
        $nameR = strpos($line, '>');
        if (!$nameL OR !$nameR) {
            return FALSE;
        } else {
            $name = substr($line, $nameL + 1, $nameR - $nameL - 1);
        }

        $subName = NULL;
        $subNameL = strpos($line, '(');
        $subNameR = strpos($line, ')');
        if ($subNameL AND $subNameR) {
            $subName = substr($line, $subNameL + 1, $subNameR - $subNameL - 1);
            $authorL = $subNameR + 1;
        } else {
            $authorL = $nameR + 1;
        }

        $authorName = substr($line, $authorL);
        if (!is_null($subName)) {
            $name .= '(' . $subName . ')';
        }

        return [
            'name' => $name,
            'author' => $authorName
        ];
    }

}