<?php
/**
 * Start up.
 * Sets up the locale and the template fetcher.
 * 
 * @author David Wiedmer <dave@sidefyn.ch>
 */
include 'LocaleUtil.php';
include 'TemplateUtil.php';

$locale = new LocaleUtil();
$template = new TemplateUtil();

// save language if get param "lang" is set
$locale->saveLanguage();

// Beam me up, Scotty
echo file_get_contents($template->getName($locale));
