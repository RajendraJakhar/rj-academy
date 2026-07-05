export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 mb-8">
          🚧 Temporary Maintenance
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          We'll Be Back Soon.
        </h1>

        <p className="mt-6 text-lg text-gray-400 leading-8">
          We're currently performing scheduled maintenance and upgrading our
          platform to deliver a faster, smoother, and more reliable experience.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-gray-300">
            Our team is working to restore all services as quickly as possible.
            Thank you for your patience and continued support. ❤️
          </p>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          © 2026 All Rights Reserved.
        </div>
      </div>
    </main>
  );
}