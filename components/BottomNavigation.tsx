import Link from 'next/link';

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 text-white flex justify-around">
      <Link href="/" className="text-center">Hokme</Link>
      <Link href="/task" className="text-center">Tasks</Link> {/* الرابط إلى صفحة Tasks */}
      <Link href="/" className="text-center">wallet</Link>
      <Link href="/task" className="text-center">game</Link> {/* الرابط إلى صفحة Tasks */}
    </div>
  );
}
