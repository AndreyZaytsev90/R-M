type InputProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  icon?: string;
  variant: 'bordered' | 'underlined';
};

export const Input = ({ value, onChange, placeholder, icon, variant }: InputProps) => {
  return (
    <div>
      <input type='text' />
    </div>
  );
};
