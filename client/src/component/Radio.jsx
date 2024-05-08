export default function Radio({ name, score, value, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name={name}
        value={score}
        checked={value === score}
        onChange={() => onChange(name, score)}
        className="accent-deepblue w-6 h-6"
      />
      {score === 2 && (
        <span className="py-1 px-5 bg-yesgreen rounded text-white text-2xl">
          Yes
        </span>
      )}
      {score === 1 && (
        <span className="py-1 px-5 bg-somewhatamber rounded text-white text-2xl">
          Somewhat
        </span>
      )}
      {score === 0 && (
        <span className="py-1 px-5 bg-nored rounded text-white text-2xl">
          No
        </span>
      )}
    </label>
  );
}
