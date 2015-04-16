<?php namespace App\Http\Controllers;
class ViewController extends controller {

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
            throw new Exception('cant find assets.json');
        } else {
            $this->_assetsJson = json_decode(file_get_contents($assetsJsonPath), TRUE);
        }
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
