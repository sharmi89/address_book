<?php

namespace app\CustomValidator;

use Illuminate\Validation\Validator;

class CustomValidator extends Validator
{
    /**
   * This can only contains alphabetic and spaces.
   **/
  public function validateAlphaSpaces($attribute, $value, $params)
  {
      return preg_match('/^[\pL\s]+$/u', $value);
  }

  /**
   * This can contains numeric, space and '+' sign.
   **/
  public function validatePhone($attribute, $value, $params)
  {
      return preg_match('/^[\pN\s+]+$/u', $value);
  }
}
