<?php

/**
 * Download or actualize file from URL address. Counting with max time life of file modification (its last modification time)
 *
 * @author Lukáš
 */
class LoadFile {

	/**
	 * Actualize file
	 * @param type $file_name - Name with path of needed file
	 * @param type $timelife - Time of max file life in seconds (0 - time is not important)
	 * @param type $source_url - URL of source (for potential download)
	 */
	public static function load($file_name = '', $timelife = 0, $source_url = '') {
		if ($file_name !== '') {
			self::getFromFile($file_name, $timelife, $source_url);
		}// end if		
	}

// end function [load]

	/**
	 * Try to load file from the $file_name path and check its time of last modification
	 * @param type $file_name - Name with path of needed file
	 * @param type $timelife - Time of max file life in seconds (0 - time is not important)
	 * @param type $source_url - URL of source (for potential download)
	 */
	private static function getFromFile($file_name, $timelife, $source_url) {
		if (file_exists($file_name)) {
			if (!self::isActual(filemtime($file_name), $timelife)) {
				self::download($file_name, $source_url);
			}// end if	
		} else {
			self::download($file_name, $source_url);
		}// end if
	}

// end function [getFromFile]
	/**
	 * Check actual with time of file and his time life
	 * @param type $file_mod_time - Time of last modification in UNIX
	 * @param type $timelife - value of max life in seconds
	 * @return boolean - Actual or not
	 */
	private static function isActual($file_mod_time, $timelife) {
		if (($timelife > 0) && (($file_mod_time + $timelife) < time())) {
			return false;
		}// end if	
		return true;
	}

// end function [isActual]

	/**
	 * Try to download content of URL and save it to $file_name path
	 * @param type $file_name - Name with path of needed file
	 * @param type $source_url - URL of source (for potential download)
	 */
	private static function download($file_name, $source_url) {
		if ($source_url !== '') {
			if (function_exists('file_get_contents')) {
				$_content = @file_get_contents($source_url);
			}// end if			
			if ($_content == '') {
				$_content = self::downloadWithCURL($source_url);
			}// end if			
			if ($_content !== FALSE) {
				file_put_contents($file_name, $_content, LOCK_EX);
			}// end if
		}
	}

// end function [download]

	/**
	 * Try to download content from URL by CURL
	 * @param type $source_url - URL of source (for potential download)
	 * @return type - Content from URL
	 */
	private static function downloadWithCURL($source_url) {
		$_ch = curl_init();
		$_timeout = 30;
		curl_setopt($_ch, CURLOPT_URL, $source_url);
		curl_setopt($_ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($_ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($_ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($_ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($_ch, CURLOPT_CONNECTTIMEOUT, $_timeout);
		$_result = curl_exec($_ch);
		curl_close($_ch);
		return $_result;
	}

// end function [downloadWithCURL]
}

// end class [LoadFile]
