/**
 * @author JungHyunKwon
 * @version 1.0.0
 */
(function() {
	'use strict';
	
	var minValue = 0.01,
		html = document.documentElement,
		isSupportTransform = html.style.transform !== undefined;

	/**
	 * @name 숫자 확인
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function isNumeric(value) {
		return typeof value === 'number' && !isNaN(value) && isFinite(value);
	}

	/**
	 * @name 퍼센트 확인
	 * @since 2017-12-06
	 * @param {*} value
	 * @return {boolean}
	 */
	function isPercent(value) {
		var result = false;

		//문자이면서 맨 마지막 글자가 퍼센트일 때
		if(typeof value === 'string' && value.substr(-1) === '%') {
			value = value.slice(0, -1);
			
			//숫자형으로 바꿔서 값이 같을 때
			if(value == parseFloat(value)) {
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
	function toFixed(value, decimal) {
		var result = NaN;

		//숫자일 때
		if(isNumeric(value)) {
			result = value;

			//숫자일 때
			if(isNumeric(decimal)) {
				var split = result.toString().split('.'),
					secondSplit = split[1];
				
				//소수점이 있을 때
				if(secondSplit) {
					split[1] = secondSplit.substring(0, decimal);

					result = parseFloat(split.join('.'));
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
			if(isPercent(value)) {
				value = parseFloat(value) * minValue;
			}
			
			//숫자일 때
			if(isNumeric(value)) {
				var elementStyle = element.style;
				
				//값이 있을 때
				if(elementStyle) {
					//소숫점 두자리로 절사
					value = toFixed(value, 2);
					
					//값이 1일 때
					if(value === 1) {
						value = '';

					//값이 최솟값보다 작을 때
					}else if(minValue > value) {
						value = minValue;
					}

					//트랜스폼을 지원할 때
					if(isSupportTransform) {
						elementStyle.transform = (value) ? 'scale(' + value + ')' : value;
					}else{
						elementStyle.zoom = value;
					}
				}
			}
		}
	};
})();