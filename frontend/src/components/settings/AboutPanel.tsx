import {ExternalLinkIcon} from "../../icons/externalLink"
import {GitHubIcon} from "../../icons/github"
import {SparkleIcon} from "../../icons/sparkle"


export default function AboutPanel() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-2xl mb-4">
          <SparkleIcon />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Good First Issues</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your gateway to open source contribution. We make finding your first issue simple, fast, and fun.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* What is this? */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-8 h-0.5 bg-yellow-400 mr-3"></span>
            What we do
          </h4>
          <p className="text-gray-600 leading-relaxed pl-11">
            We scan GitHub every 6 hours for beginner-friendly issues from top tech companies and 
            popular open source projects. Our smart algorithms surface the best opportunities 
            based on activity, complexity, and community engagement.
          </p>
        </section>

        {/* How it Works */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-0.5 bg-yellow-400 mr-3"></span>
            How it works
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-gray-900">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Continuous Scanning</p>
                <p className="text-sm text-gray-600">We monitor GitHub for "good first issue" labels</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-gray-900">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Smart Filtering</p>
                <p className="text-sm text-gray-600">Issues are sorted and cached for performance</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-gray-900">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Recommendations</p>
                <p className="text-sm text-gray-600">Our algorithm highlights the best matches</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-gray-900">4</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Perfect Match</p>
                <p className="text-sm text-gray-600">Filter by language, org, and difficulty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-8 h-0.5 bg-yellow-400 mr-3"></span>
            Tech stack
          </h4>
          <div className="flex flex-wrap gap-2 pl-11">
            {[
              "Next.js",
              "FastAPI", 
              "Redis",
              "TailwindCSS",
              "GitHub GraphQL",
              "TypeScript",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-yellow-100 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center border border-yellow-200">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Want to contribute?</h4>
          <p className="text-gray-700 mb-6">
            Good First Issues is open source and I'd love your help making it even better!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/Mrigankkh/good-first-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
              <GitHubIcon />
              <span>View on GitHub</span>
              <ExternalLinkIcon />
            </a>
            <a
              href="https://github.com/Mrigankkh/good-first-issue/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-gray-900 rounded-xl hover:shadow-md transition-all font-medium border border-gray-200"
            >
              <span>Report an Issue</span>
              <ExternalLinkIcon />
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Designed and developed by{" "}
            <a href="https://www.mrigank.me" className="text-gray-700 hover:text-gray-900 font-medium">
              Mrigank
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}