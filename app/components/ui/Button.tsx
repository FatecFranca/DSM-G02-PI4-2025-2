import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'play' | 'arrow' | 'check';
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  onPress, 
  disabled = false,
  children,
  style 
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText
  ];

  const getIconName = () => {
    switch (icon) {
      case 'play': return 'play';
      case 'arrow': return 'arrow-forward';
      case 'check': return 'checkmark';
      default: return null;
    }
  };

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons 
          name={getIconName() as any} 
          size={size === 'lg' ? 20 : 16} 
          color={variant === 'outline' ? '#3B82F6' : '#FFFFFF'} 
          style={styles.icon}
        />
      )}
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: '#3B82F6',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  md: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#3B82F6',
  },
  outlineText: {
    color: '#3B82F6',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
});
