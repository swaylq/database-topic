<?php namespace App\Http\Controllers;

use App\Http\Requests;

class ViewController extends Controller {

	protected $_assetsJson;
    protected $_assetsName = '';
    public $assetsData = array(
        'header_data' => array()
    );

    public function __construct()
    {
        // load the assets
        $assetsJsonPath = __DIR__ . '/assets.json';

        if (!file_exists($assetsJsonPath)) {
            throw new \Exception('cant find assets.json');
        } else {
            $this->_assetsJson = json_decode(file_get_contents($assetsJsonPath), TRUE);
        }

		if (!\Session::get('database')) {
			\Session::set('database', 'mysql');
		}

		$this->addJson('g_config', array('database' => \Session::get('database')));
    }

    protected function requireAssets($assetName)
    {
        $this->_assetsName = $assetName;
    }

    protected function loadView($viewName, $data)
    {
        if (!empty($this->_assetsName)) {
            $this->assetsData['assetsPack'] = $this->_assetsJson[$this->_assetsName];
        }
        return View('layouts.master', $this->assetsData)->nest('content', $viewName, $data);
    }

    protected function addJson($name, $value, $forceEmpty = FALSE)
    {
        if (!$forceEmpty AND (!isset($name) OR empty($name) OR !isset($value))) {
            return;
        } else {
            if (!is_string($value)) $value = json_encode($value);
            $this->assetsData['header_data']['json']['name'][] = $name;
            $this->assetsData['header_data']['json']['value'][] = $value;
        }
    }

	public function home()
	{
		$this->requireAssets('home');
		return $this->loadView('home', array());
	}

	public function bookList()
	{
		$this->requireAssets('book_list');
		return $this->loadView('book_list', array());
	}

	public function bookDetail()
	{
		$this->requireAssets('book_detail');
		return $this->loadView('book_detail', array());
	}

	public function orderList()
	{
		$this->requireAssets('order_list');
		return $this->loadView('order_list', array());
	}

}
