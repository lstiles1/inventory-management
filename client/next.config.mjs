/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "s3-inventorymanagement-img.s3.us-west-1.amazonaws.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
  export default nextConfig;