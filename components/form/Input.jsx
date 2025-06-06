
const Input = (props) => {
  const { placeholder, errorMessage, touched, ...inputProps } = props;

  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input {...inputProps} className={`h-14 w-full border ${touched && errorMessage ? "border-red-500" : "border-primary"} outline-none px-4 peer`} required />
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">{placeholder}</span>
      </label>
      {touched && <span className="text-danger text-xs">{errorMessage}</span>}

    </div>
  )
}

export default Input