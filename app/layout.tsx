import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HeroPitch - Eleve o seu negócio",
  openGraph: {
    title: "HeroPitch -  Eleve o seu negócio",
    description:
      "HeroPitch é uma plataforma de pitch de negócios que ajuda você a criar um pitch incrível.",
    images: [
      {
        url: "https://hero-pitch.vercel.app/opengraph-image",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Liftoff - AI-Powered Mock Interviews",
  //   description:
  //     "Liftoff is an AI-powered mock interview platform that helps you practice for your next job interview.",
  //   images: ["https://demo.useliftoff.com/opengraph-image"],
  //   creator: "@tmeyer_me",
  // },
  metadataBase: new URL("https://demo.useliftoff.com"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
