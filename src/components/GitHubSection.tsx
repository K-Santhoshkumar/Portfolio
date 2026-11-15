"use client";

import React, { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";

interface RepoItem {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubData {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    bio: string;
  };
  repos: RepoItem[];
}

export default function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const res = await fetch("/api/github");
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          setError(json.error || "Unable to fetch live GitHub statistics");
        }
      } catch {
        setError("Network error fetching GitHub stats");
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, []);

  return (
    <section id="github" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-[#252A32]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161A20] border border-[#252A32] text-xs font-mono text-[#D4F933] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span>Open Source &amp; Repositories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F2F2EE]">
            GitHub Telemetry.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#92969F] font-mono">
          Direct activity stream from{" "}
          <a
            href="https://github.com/K-Santhoshkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4F933] font-semibold hover:underline"
          >
            @K-Santhoshkumar
          </a>
        </p>
      </div>

      {loading ? (
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#252A32] text-center text-[#656B75] text-xs font-mono animate-pulse shadow-sm">
          FETCHING GITHUB TELEMETRY...
        </div>
      ) : error && !data ? (
        <div className="p-6 rounded-2xl bg-[#101216] border border-[#252A32] text-center text-xs text-[#92969F] font-mono shadow-sm">
          <p>GitHub telemetry cache active. Repositories accessible below.</p>
          <a
            href="https://github.com/K-Santhoshkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#D4F933] font-semibold hover:underline"
          >
            View GitHub Profile <ExternalLink size={12} />
          </a>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* GitHub Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="glow-hover-smokey p-4 rounded-xl flex items-center justify-between font-mono shadow-xs">
              <span className="text-xs text-[#656B75] font-medium">Public Repositories</span>
              <span className="text-lg font-bold text-[#F2F2EE]">
                {data.user.public_repos}
              </span>
            </div>
            <div className="glow-hover-smokey p-4 rounded-xl flex items-center justify-between font-mono shadow-xs">
              <span className="text-xs text-[#656B75] font-medium">Followers</span>
              <span className="text-lg font-bold text-[#F2F2EE]">
                {data.user.followers}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 glow-hover-smokey p-4 rounded-xl flex items-center justify-between font-mono shadow-xs">
              <span className="text-xs text-[#656B75] font-medium">Activity Status</span>
              <span className="text-xs font-bold text-[#D4F933] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
                ACTIVE
              </span>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.repos.slice(0, 4).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-hover-card p-5 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Code2 size={15} className="text-[#D4F933]" />
                    <ExternalLink size={13} className="text-[#656B75] group-hover:text-[#D4F933] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-[#F2F2EE] group-hover:text-[#D4F933] transition-colors line-clamp-1 mb-1 font-mono">
                    {repo.name}
                  </h4>
                  <p className="text-xs text-[#92969F] line-clamp-2 leading-relaxed">
                    {repo.description || "Open source project repository on GitHub."}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#252A32] flex items-center justify-between text-[11px] font-mono text-[#656B75]">
                  <span className="text-[#F2F2EE] font-semibold">{repo.language || "Code"}</span>
                  <div className="flex items-center gap-2">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-0.5 text-[#D4F933] font-semibold">
                        <Star size={11} className="fill-[#D4F933]" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-0.5">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
