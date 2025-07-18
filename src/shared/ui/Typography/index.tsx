import { FC } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { useStyles } from 'shared/styles/useStyles.ts';

interface Props extends TextProps {
  type?: 'text' | 'caption' | 'label' | 'title' | 'header';
  color?: Record<'color', string>;
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
  size?: TextStyle['fontSize'];
}

export const Typography: FC<Props> = ({
  type = 'text',
  color,
  align = 'left',
  weight = '400',
  size,
  ...props
}) => {
  const { fontColors } = useStyles();
  const style = styles[type];
  const dynamicStyles: TextStyle = {
    ...color,
    textAlign: align,
    fontWeight: weight,
    fontSize: size ?? style.fontSize,
  };

  return (
    <Text
      {...props}
      style={[style, fontColors.main, dynamicStyles, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  header: {
    fontSize: 21,
    fontWeight: '600',
  },
});
