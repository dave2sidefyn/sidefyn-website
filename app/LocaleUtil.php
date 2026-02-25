<?php

/**
 * Class that can detect the desired locale of the user.
 *
 * @author David Wiedmer <dave@sidefyn.ch>
 */
class LocaleUtil
{
    /**
     * An array of all the languages supported by the website.
     *
     * @var array
     */
    private $languages = [
        'de_CH'
    ];

    /**
     * Default language if none is found or chosen.
     *
     * @var string
     */
    private $fallbackLanguage = 'de_CH';

    /**
     * Constructor.
     * Sets timezone.
     */
    public function __construct()
    {
        date_default_timezone_set('Europe/Zurich');
    }

    /**
     * Checks the client for the best matching language.
     *
     * @return string
     */
    public function getLanguage()
    {
        if (isset($_COOKIE ['lang']) && in_array($_COOKIE ['lang'], $this->languages)) {
            return $_COOKIE ['lang'];
        }

        if (! isset($_SERVER ['HTTP_ACCEPT_LANGUAGE'])) {
            return $this->fallbackLanguage;
        }
        $langs = explode(',', $_SERVER ['HTTP_ACCEPT_LANGUAGE']);

        $preferred = [ ];

        foreach ($langs as $lang) {
            $info = explode(';', $lang);

            $preferred [] = [
                'lang' => $this->getLanguageCode($info [0]),
                'priority' => $this->getPriority($info)
            ];
        }

        // sort it by priority
        usort($preferred, function ($a, $b)
        {
            if ($a ['priority'] == $b ['priority']) {
                return 0;
            }
            return ($a ['priority'] > $b ['priority']) ? - 1 : 1;
        });

        // check each language if it is supported
        for($i = 0; $i < count($preferred); $i ++) {
            if (in_array($preferred [$i], $this->languages)) {
                return $preferred [$i];
            }
        }
        return $this->fallbackLanguage;
    }

    /**
     * Formats the language code.
     *
     * @param string $str
     * @return string
     */
    private function getLanguageCode($str)
    {
        $info = explode('_', str_replace('-', '_', $str));
        if (count($info) != 2) {
            return $info [0];
        }

        return strtolower($info [0]) . '_' . strtoupper($info [1]);
    }

    /**
     * Returns the priority of the language.
     *
     * @param array $info
     * @return number
     */
    private function getPriority($info)
    {
        if (count($info) != 2) {
            return 0;
        }

        $prio = explode('=', $info [1]);
        if (count($prio) != 2) {
            return 0;
        }
        return floatval($prio [1]);
    }

    /**
     * Saves the language chosen by the user to a cookie.
     */
    public function saveLanguage()
    {
        if (! isset($_GET ['lang'])) {
            return;
        }

        $lang = $this->getLanguageCode($_GET ['lang']);

        if (! in_array($lang, $this->languages)) {
            return;
        }

        $_COOKIE ['lang'] = $lang;
        setcookie('lang', $lang, time() + (60 * 60 * 24 * 180), '/'); // 180 days
    }

}
