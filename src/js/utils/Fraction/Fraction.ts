const gcd: Function = (a: number, b: number) => (b ? gcd(b, a % b) : a);

export const Fraction = function(_decimal: any) {
  var top = _decimal.toString().replace(/\d+[.]/, '');
  var bottom = Math.pow(10, top.length);
  if (_decimal > 1) {
    top = +top + Math.floor(_decimal) * bottom;
  }
  var x = gcd(top, bottom);
  return {
    top: top / x,
    bottom: bottom / x,
    display: top / x + '/' + bottom / x
  };
};
