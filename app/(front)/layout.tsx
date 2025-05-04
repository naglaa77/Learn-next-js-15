export default function LayoutFront({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-red-500">layout from front</h2>
      {children}
    </div>
  );
}
