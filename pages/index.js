import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-200">
      <Head>
        <title>SAHAN Engineering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-brand-primary">
          Welcome to{' '}
          <a className="text-brand-secondary" href="#">
            <span className="text-brand-accent">SAHAN</span> Engineering!
          </a>
        </h1>

        <p className="mt-3 text-2xl text-base-content">
          Your backend is running. You can now start migrating your components.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="p-6 mt-6 text-left border w-96 rounded-xl bg-base-100 shadow-md">
            <h3 className="text-2xl font-bold">API Endpoints &rarr;</h3>
            <p className="mt-4 text-xl">
              Your Express API is ready to be tested.
            </p>
            <ul className="list-disc list-inside mt-2 text-left">
                <li><code>GET /api/students</code></li>
                <li><code>POST /api/students</code></li>
                <li><code>GET /api/courses</code></li>
                <li><code>POST /api/courses</code></li>
                <li><code>POST /api/enroll</code></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
