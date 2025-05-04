import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbdnttcirbuvjxdvwpxf.supabase.co',
                pathname: '/storage/v1/object/public/cabin_images/**',
            },
        ],
    },
};

export default nextConfig;
