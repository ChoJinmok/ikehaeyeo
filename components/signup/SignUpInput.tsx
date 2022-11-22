interface SignUpInputProps {
    name: string
}

export default function SignUpInput({ name }: SignUpInputProps) {
  return (
    <>
      <label htmlFor={name}>
        {name}
      </label>
      <input
        type="text"
        id={name}
        name={name}
      />
    </>
  );
}
