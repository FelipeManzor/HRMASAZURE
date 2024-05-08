export default function CenterContainer({ children, className }) {
  return (
    <div className={`w-full h-full flex flex-col justify-center items-center ${className}`}>
      {children}
    </div>
  );
}
