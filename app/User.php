<?php namespace App;

use App\Exceptions\AuthException;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'password'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password'];

    public static function login($name, $pwd)
    {
        $queryResult = \DB::select(
            'SELECT id, name, secrets ' .
            'FROM users ' .
            "WHERE name='{$name}' " .
            "AND password='" . sha1($pwd) . "'"
        );

//        dd($queryResult);
        if (empty($queryResult)) {
            throw new AuthException();
        }

        return $queryResult;
    }

}
