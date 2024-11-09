export default function KeyButton({ keyValue, onAddKey, className}) {
  return (
    <button className={className}
      onClick={() => onAddKey(keyValue)}>
      {keyValue}
    </button>
  )
}
