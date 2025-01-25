import Link from 'next/link';

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-200 shadow-lg p-3 flex justify-around items-center">
      <Link
        href="/"
        className="flex flex-col items-center text-sm hover:text-white transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h11M9 21V3m6 18h3m-3-4h2m-2-4h2m-2-4h2"
          />
        </svg>
        Home
      </Link>
      <Link
        href="/tasks"
        className="flex flex-col items-center text-sm hover:text-white transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l7 7m-7-7l7-7"
          />
        </svg>
        Tasks
      </Link>
      <Link
        href="/game"
        className="flex flex-col items-center text-sm hover:text-white transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c-2.623-3.216-8-6-8-6s2.49 7.736 3.823 8.823C9.823 15.69 12 21 12 21s4.763-9.326 8-12c0 0-3.955 2.784-8 2z"
          />
        </svg>
        Invite Friends
      </Link>
      <Link
        href="/wallet"
        className="flex flex-col items-center text-sm hover:text-white transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 7h14M5 7l7 7m-7-7l7-7"
          />
        </svg>
        Wallet
      </Link>
    </div>
  );
}
