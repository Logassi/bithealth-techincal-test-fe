export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Landing Page</h1>
      <p className="text-lg text-gray-700 mb-8">
        This is a simple landing page built with Next.js and Tailwind CSS.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Get Started
      </button>
    </div>
  );
}
