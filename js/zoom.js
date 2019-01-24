/**
 * @author JungHyunKwon
 * @version 1.0.0
 */

try {
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
		function _isNumber(value) {
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

			//문자이면서 맨 뒷문자가 %일 때
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
		 * @name 소숫점 절사
		 * @param {number} value
		 * @param {number} decimal
		 * @return {number}
		 * @since 2018-07-13
		 */
		function _toFixed(value, decimal) {
			var result = NaN;
			
			//값이 숫자일 때
			if(_isNumber(value)) {
				result = value;
				
				//소수가 숫자일 때
				if(_isNumber(decimal)) {
					var splitValue = value.toString().split('.'),
						splitValue1 = splitValue[1];
					
					//소숫점이 있을 때
					if(splitValue1) {
						splitValue[1] = splitValue1.substring(0, decimal);
						result = parseFloat(splitValue.join('.'), 10);
					}
				}
			}

			return result;
		}
		
		/**
		 * @name 요소 확인
		 * @since 2019-01-18
		 * @param {*} value
		 * @return {boolean}
		 */
		function _isElement(value) {
			var result = false;
			
			try {
				result = _html.contains(value);
			}catch(e) {
				//throw e;
			}

			return result;
		}
		
		/**
		 * @name zoom
		 * @param {element} element
		 * @param {number} value
		 * @since 2019-01-23
		 */
		window.zoom = function(element, value) {
			//요소일 때
			if(_isElement(element)) {
				//퍼센트일 때
				if(_isPercent(value)) {
					value = parseFloat(value, 10) * _minValue;
				}
				
				//숫자일 때
				if(_isNumber(value)) {
					var elementStyle = element.style;

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
}catch(e) {
	console.error(e);
}