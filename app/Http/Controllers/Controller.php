<?php namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use DispatchesCommands, ValidatesRequests;

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

        SiteStat::inc(SiteStat::VISITS);
		var_dump(123);
		exit;
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
}
