import wx, { mergeOptions } from '../../../utils/weex';
import Util from '../util';

const options = mergeOptions({
  data: {}
}, Util);

Page(options);
