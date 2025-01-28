/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ibb.co",
        },
        {
          protocol: "https",
          hostname: "www.pexels.com",
        },
        {
          protocol: "https",
          hostname: "www.fradaksa.net",
        },
        {
          protocol: "https",
          hostname: "back.fradaksa.net",
        },
      ],
      domains: ["127.0.0.1", "fradaksa.com"],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            outputPath: "static/fonts/",
            name: "[name].[ext]",
          },
        },
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  