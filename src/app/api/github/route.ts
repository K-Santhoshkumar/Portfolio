import { NextResponse } from "next/server";

interface CachedGitHubData {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    bio: string;
  };
  repos: Array<{
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
  }>;
  cachedAt: number;
}

let githubCache: CachedGitHubData | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

export async function GET() {
  const username = "K-Santhoshkumar";
  const now = Date.now();

  if (githubCache && now - githubCache.cachedAt < CACHE_DURATION_MS) {
    return NextResponse.json({
      success: true,
      data: githubCache,
      cached: true,
    });
  }

  try {
    const headers: Record<string, string> = {
      "User-Agent": "portfolio-app-github-fetcher",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user info
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!userRes.ok) {
      // Return cached data if available on rate limit
      if (githubCache) {
        return NextResponse.json({
          success: true,
          data: githubCache,
          cached: true,
        });
      }
      return NextResponse.json(
        { error: `GitHub API error: ${userRes.statusText}` },
        { status: userRes.status }
      );
    }

    const userData = await userRes.json();

    // Fetch public repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`,
      { headers, next: { revalidate: 3600 } }
    );

    const reposData = reposRes.ok ? await reposRes.json() : [];

    const formattedRepos = Array.isArray(reposData)
      ? reposData.map((r: { id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; forks_count: number; updated_at: string }) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          language: r.language,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          updated_at: r.updated_at,
        }))
      : [];

    githubCache = {
      user: {
        login: userData.login,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        public_repos: userData.public_repos,
        followers: userData.followers,
        bio: userData.bio,
      },
      repos: formattedRepos,
      cachedAt: now,
    };

    return NextResponse.json({
      success: true,
      data: githubCache,
      cached: false,
    });
  } catch (error) {
    console.error("GitHub API fetch error:", error);
    if (githubCache) {
      return NextResponse.json({
        success: true,
        data: githubCache,
        cached: true,
      });
    }
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics." },
      { status: 500 }
    );
  }
}

