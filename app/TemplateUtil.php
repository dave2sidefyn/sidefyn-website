<?php
/**
 * Returns the path to the template based on the URL.
 *
 * @return string Path to template
 */
class TemplateUtil {
	public function getName(LocaleUtil $locale) {
		$lang = $locale->getLanguage ();
		
		$notfound = __DIR__ . '/../public/dist/html/' . $lang . '/notfound.html';
		
		$routes = [ 
				'de_CH' => [ 
						'/' => 'home' 
				]
		];
		
		if (! array_key_exists ( $_SERVER ['REQUEST_URI'], $routes [$lang] )) {
            echo print_r(!array_key_exists ( $_SERVER ['REQUEST_URI'], $routes [$lang] ));
			return $notfound;
		}
		
		$name = $routes [$lang] [$_SERVER ['REQUEST_URI']];
		$template = __DIR__ . '/../public/dist/html/' . $lang . '/' . $name . '.html';

		if (! file_exists ( $template )) {
			return $notfound;
		}

        return $template;
	}
}
