angular.module('jsBarcode', [])
.constant('jsBarcodeTypes', [
  ['CODE128',    'CODE128 auto'],
  ['CODE128A',   'CODE128 A'],
  ['CODE128B',   'CODE128 B'],
  ['CODE128C',   'CODE128 C'],
  ['EAN13',      'EAN13'],
  ['EAN8',       'EAN8'],
  ['UPC',        'UPC'],
  ['CODE39',     'CODE39'],
  ['ITF14',      'ITF14'],
  ['ITF',        'ITF'],
  ['MSI',        'MSI'],
  ['MSI10',      'MSI10'],
  ['MSI11',      'MSI11'],
  ['MSI1010',    'MSI1010'],
  ['MSI1110',    'MSI1110'],
  ['pharmacode', 'Pharmacode']
])
.service('jsBarcode', ['$window', function ($window) {
  if(!$window.JsBarcode)
    throw new Error('JsBarcode is not included.');

  return $window.JsBarcode;
}])
.service('indexOfJsBarcodeType', ['jsBarcodeTypes', function (jsBarcodeTypes) {
  return function (type) {
    var index = -1;

    jsBarcodeTypes.every(function (item, itemIndex) {
      if(item[0] === type) index = itemIndex;
      return (index === -1);
    });

    return index;
  };
}])
.service('validJsBarcodeType', ['indexOfJsBarcodeType', function (indexOfJsBarcodeType) {
  return function (type) {
    return indexOfJsBarcodeType(type) > -1;
  };
}])
.component('barcode', {
  controller: ['$scope', '$element', '$compile', 'jsBarcode', function ($scope, $element, $compile, jsBarcode) {
    var
    ctrl = this,
    elId = null,
    isValid = false,
    hasInitialized = false,
    settings = {
      renderAs:     'svg',
      format:       'CODE39',
      background:   null,
      lineColor:    "#000000",
      height:       50,
      width:        1,
      margin:       5,
      textMargin:   0,
      displayValue: true,
      fontSize:     15,
      font:         "monospace",
      fontOptions:  "bold",
      textAlign:    "center"
    };

    function applySettings(apply) {
      settings = angular.merge(settings, apply);

      if(elId) { // previous el id exists, remove it
        $element.empty();
        elId = null;
      }

      var
      // type of element to create
      _tag   = settings.renderAs,
      // create a new element id for this (to link with jsBarcode)
      _newId = 'barcode-'+Date.now(),
      // create a new container image el (img|canvas|svg)
      _newEl = angular.element('<'+_tag+' id="'+_newId+'"></'+_tag+'>');

      if(['canvas','img','svg'].indexOf(String(_tag).toLowerCase()) === -1)
        return;

      $element.append(_newEl);
      $compile(_newEl)($scope);

      var
      barcode = new jsBarcode('#'+_newId, ctrl.model, angular.merge({}, settings, {
        valid: function (valid) { isValid = valid; }
      }));

      if(isValid) { // remember this element's id, so we can remove it on change.
        elId = _newId;
      }
      else {
        console.error('Invalid Barcode generated (check value)', barcode);
        _newEl.remove();
        barcode = false;
      }

      return barcode;
    }

    ctrl.$onInit = function () {
      hasInitialized = true;
      applySettings(Object.keys(settings).reduce(function (p, key) {
        if(ctrl.hasOwnProperty(key)) p[key] = ctrl[key];
        return p;
      }, {}));
    };
    ctrl.$onChanges = function (changes) {
      if(!hasInitialized) return;
      applySettings(Object.keys(settings).reduce(function (p, key) {
        if(changes.hasOwnProperty(key)) p[key] = changes[key].currentValue;
        return p;
      }, {}));
    };
  }],
  bindings: {
    model:        '<ngModel',
    renderAs:     '<?renderAs',
    format:       '<?format',
    background:   '<?bgColor',
    lineColor:    '<?barColor',
    height:       '<?barHeight',
    width:        '<?barWidth',
    margin:       '<?marginOuter',
    textMargin:   '<?marginLabel',
    displayValue: '<?displayValue',
    fontSize:     '<?labelFontSize',
    font:         '<?labelFont',
    fontOptions:  '<?labelFontOptions',
    textAlign:    '<?labelAlign'
  }
});
