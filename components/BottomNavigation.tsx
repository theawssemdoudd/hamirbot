import Link from 'next/link';

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-500 p-4 text-white flex justify-around">
      <Link href="/" passHref>
        <a className="text-center">Home</a>
      </Link>
      <Link href="/tasks" passHref>
        <a className="text-center">Tasks</a> {/* الرابط إلى صفحة Tasks */}
      </Link>
      <Link href="/wallet" passHref>
        <a className="text-center">Wallet</a>
      </Link>
    </div>
  );
}
