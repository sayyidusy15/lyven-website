const isDevelopment = process.env.NODE_ENV === 'development';
const supabaseOrigin = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').origin; }
  catch { return ''; }
})();
const supabaseSocketOrigin = supabaseOrigin ? supabaseOrigin.replace(/^https:/, 'wss:') : '';
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${supabaseOrigin} ${supabaseSocketOrigin}${isDevelopment ? ' ws: wss: http: https:' : ''}`,
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "frame-src https://www.youtube.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "worker-src 'self' blob:",
  ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    const noIndexPaths = ['/admin/:path*'];
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: csp },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()' },
        { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ...(!isDevelopment ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : []),
      ],
    }, ...noIndexPaths.map((source) => ({ source, headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }))];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
