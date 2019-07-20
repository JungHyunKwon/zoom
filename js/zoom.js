/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
(function() {
	'use strict';
	
	var _minValue = 0.01,
		_html = document.documentElement,
		_isSupportTransform = _html.style.transform !== undefined;

	/**
	 * @name 숫자 확인
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function _isNumeric(value) {
		return typeof value === 'number' && !isNaN(value) && isFinite(value);
	}

	/**
	 * @name 퍼센트 확인
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function _isPercent(value) {
		var result = false;

		//문자이면서 마지막 문자가 %일 때
		if(typeof value === 'string' && value.substr(-1) === '%') {
			value = value.substring(0, value.length - 1);
			
			//퍼센트일 때
			if(value == parseFloat(value, 10)) {
				result = true;
			}
		}

		return result;
	}

	/**
	 * @name 소수점 절사
	 * @param {number} value
	 * @param {number} decimal
	 * @return {number}
	 * @since 2018-07-13
	 */
	function _toFixed(value, decimal) {
		var result = NaN;
		
		//값이 숫자일 때
		if(_isNumeric(value)) {
			result = value;
			
			//소수가 숫자일 때
			if(_isNumeric(decimal)) {
				var splitValue = value.toString().split('.'),
					firstSplitValue = splitValue[1];
				
				//소숫점이 있을 때
				if(firstSplitValue) {
					splitValue[1] = firstSplitValue.substring(0, decimal);
					result = parseFloat(splitValue.join('.'), 10);
				}
			}
		}

		return result;
	}
	
	/**
	 * @name zoom
	 * @param {object} element
	 * @param {number} value
	 * @since 2019-01-23
	 */
	window.zoom = function(element, value) {
		//요소일 때
		if(element) {
			//퍼센트일 때
			if(_isPercent(value)) {
				value = parseFloat(value, 10) * _minValue;
			}
			
			//숫자일 때
			if(_isNumeric(value)) {
				var elementStyle = element.style || {};

				//소숫점 두자리로 절사
				value = _toFixed(value, 2);
				
				//값이 1일 때
				if(value === 1) {
					value = '';

				//값이 최솟값보다 작을 때
				}else if(_minValue > value) {
					value = _minValue;
				}

				//트랜스폼을 지원할 때
				if(_isSupportTransform) {
					elementStyle.transform = (value) ? 'scale(' + value + ')' : value;
				}else{
					elementStyle.zoom = value;
				}
			}
		}
	};
})();