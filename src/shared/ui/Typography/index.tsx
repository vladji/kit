import { FC } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { lightThemeText } from 'shared/styles/theme/themeText.ts';

interface Props extends TextProps {
  type?: 'text' | 'caption' | 'label' | 'title' | 'header';
  size?: TextStyle['fontSize'];
  weight?: TextStyle['fontWeight'];
  leading?: TextStyle['lineHeight'];
  color?: TextStyle['color'];
  align?: TextStyle['textAlign'];
}

type StyleProps = Omit<Props, 'type'>;

export const Typography: FC<Props> = ({
  type = 'text',
  size,
  weight,
  leading,
  color = lightThemeText.main,
  align = 'left',
  ...props
}) => {
  const styles = getStyles({
    size,
    weight,
    leading,
    color,
    align,
  });

  return <Text {...props} style={[styles[type], props.style]} />;
};

const getStyles = ({ size, weight, leading, color, align }: StyleProps) =>
  StyleSheet.create({
    label: {
      fontSize: 12,
      fontWeight: '400',
      color,
      textAlign: align,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      color,
      textAlign: align,
    },
    text: {
      fontSize: size ?? 16,
      fontWeight: weight ?? '400',
      color,
      textAlign: align,
      lineHeight: leading,
    },
    title: {
      fontSize: 18,
      fontWeight: '500',
      color,
      textAlign: align,
    },
    header: {
      fontSize: 21,
      fontWeight: '600',
      color,
      textAlign: align,
    },
  });
