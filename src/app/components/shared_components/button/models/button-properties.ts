import { NzButtonShape } from 'ng-zorro-antd/button';
import { IconPropertiesI } from '../../icon/icon.component';

export type ButtonPropertiesI = {
  type?: any;
  shape?: NzButtonShape;
  text?: string;
  link?: {
    enable: boolean;
    url: string;
  };
  fontSize?: string;
  fontWeight?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  icon?: IconPropertiesI;
  backgroundColor?: string;
  color?: string;
};
