import BottomNavigation from '@/components/BottomNavigation';  // استيراد المكون
export default function Tasks() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks Page</h1>
      <p>Here are your games.</p>
      <BottomNavigation />
    </div>
  );
}
