// pages/about.tsx
import Link from "next/link";
import Head from "next/head";
import Footer from "@/components/Footer";

// Icons - replace with your icon library
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default function About() {
  return (
    <>
      <Head>
        <title>About - Good First Issues</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Simple Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <BackIcon />
              <span>Back to Issues</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Good First Issues
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Find your first open source contribution faster than ever
              </p>
            </div>

            {/* What is this? */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                What is Good First Issues?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Good First Issues is a curated platform that helps developers
                find beginner-friendly open source issues from popular projects,
                especially from FAANG and other major tech companies. We
                automatically fetch and update issues every 6 hours, making it
                easy for you to find the perfect contribution opportunity.
              </p>
            </section>

            {/* How it Works */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                How It Works
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">1.</span>
                  <p>
                    Our backend continuously scans GitHub for issues labeled
                    "good first issue" from curated organizations
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">2.</span>
                  <p>
                    Issues are filtered, sorted, and cached in Redis for fast
                    access
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">3.</span>
                  <p>
                    The recommendation algorithm highlights the most suitable
                    issues based on popularity and recency
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-500 font-bold">4.</span>
                  <p>
                    You can filter by organization, programming language, and
                    more to find your perfect match
                  </p>
                </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Built With
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Next.js", desc: "React Framework" },
                  { name: "FastAPI", desc: "Backend API" },
                  { name: "Redis", desc: "Caching Layer" },
                  { name: "TailwindCSS", desc: "Styling" },
                  { name: "GitHub API", desc: "Data Source" },
                  { name: "TypeScript", desc: "Type Safety" },
                  { name: "Upstash", desc: "Managed Redis" },
                  { name: "GraphQL", desc: "API Queries" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {tech.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {tech.desc}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contributing */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Contributing
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Good First Issues is open source! We welcome contributions of
                all kinds - from bug fixes to new features. Check out our
                repository to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/Mrigankkh/good-first-issue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <GitHubIcon />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="https://github.com/Mrigankkh/good-first-issue/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                >
                  <span>Report an Issue</span>
                </a>
              </div>
            </section>

            {/* Footer */}
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}
