
import InputField, { type InputFieldProps } from "./InputField";
import { type Meta, type StoryFn } from '@storybook/react-vite';


export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    loading: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    showPasswordToggle: { control: 'boolean' },
  },
} as Meta;

const Template:StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Input',
  placeholder: 'Enter text here...',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'Input with helper text',
  placeholder: 'Enter text here...',
  helperText: 'This is a helpful message',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: 'Input with error',
  placeholder: 'Enter text here...',
  invalid: true,
  errorMessage: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'Enter text here...',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Input',
  placeholder: 'Enter text here...',
  loading: true,
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  label: 'Input with clear button',
  placeholder: 'Enter text here...',
  value: 'Sample text',
  showClearButton: true,
};

export const PasswordWithToggle = Template.bind({});
PasswordWithToggle.args = {
  label: 'Password Input',
  placeholder: 'Enter your password',
  type: 'password',
  showPasswordToggle: true,
};

export const FilledVariant = Template.bind({});
FilledVariant.args = {
  label: 'Filled Input',
  placeholder: 'Enter text here...',
  variant: 'filled',
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  label: 'Ghost Input',
  placeholder: 'Enter text here...',
  variant: 'ghost',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  label: 'Small Input',
  placeholder: 'Enter text here...',
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  label: 'Large Input',
  placeholder: 'Enter text here...',
  size: 'lg',
};
