## angular-jsbarcode
An Angular component wrapper for [JsBarcode](https://github.com/lindell/JsBarcode).
If you want to see this in action, [click here to see a codepen demo](http://codepen.io/kryo2k/full/woZGmv).


### Bower Install
```bash
bower install --save angular-jsbarcode
```

### CDN Install
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/jsbarcode/3.5.1/JsBarcode.all.min.js"></script>
<script type="text/javascript" src="-- coming soon --"></script>
```

### Include into your Angular module
```js
angular.module('myAwesomeModule',['jsBarcode']);
```


## What's in the box?

### Barcode Directive

Uses `ngModel` directive to bind the text value of the encoded barcode. There are also quite a few customization options passed through to JsBarcode.

One-way bound component attributes:


| Attribute        | Type    | Default     | Description            |
|------------------|:-------:|:-----------:|------------------------|
| renderAs         | String  | "svg"       | Defines what element should be used when rendering this barcode. Supports `image`, `canvas`, or `svg`. |
| format           | String  | "CODE39"    | Supported formats: `CODE128`, `CODE128A`, `CODE128B`, `CODE128C`, `EAN13`, `EAN8`, `UPC`, `CODE39`, `ITF14`, `ITF`, `MSI`, `MSI10`, `MSI11`, `MSI1010`, `MSI1110`, `pharmacode`. |
| bgColor          | String  | NULL        | Background color to apply for for this barcode image. If `NULL` or empty string, it will be transparent. |
| barColor         | String  | "#000000"   | Foreground color to apply (applies to both bars and label). |
| barHeight        | Number  | 50          | Height to draw the bars. |
| barWidth         | Number  | 1           | Bar width multiplier to use. |
| marginOuter      | Number  | 0           | Outside margin to use. |
| marginLabel      | Number  | 0           | Spacing between bars and label. |
| displayValue     | Boolean | TRUE        | If the value should be displayed in the barcode or not. |
| labelFontSize    | Number  | 15          | Size of the label font.
| labelFont        | String  | "monospace" | The font-family that should be used for the barcode label. Can be any font available in browser. |
| labelFontOptions | String  | ""          | Supports `bold` and/or `italic` |
| labelAlign       | String  | "center"    | Supports `center`, `left`, `right` |


**Simple Usage Example**
```html
<barcode ng-model="'0123456789'" format="'CODE39'"></barcode>
```

**Customized Example**
```html
<barcode
    ng-model="'0123456789'"
    render-as="'svg'"
    format="'CODE128'"
    bg-color="'#ffffff'"
    bar-color="'#000000'"
    bar-height="25"
    bar-width="1"
    margin-outer="0"
    margin-label="0"
    display-value="true"
    label-font-size="15"
    label-font="'monospace'"
    label-font-options="'bold italic'"
    label-align="'center'">
</barcode>
```
