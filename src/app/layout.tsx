import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'FRONTIER — How Close Are We?',
 description: 'Explore humanity’s biggest unanswered questions through sourced evidence, research roadmaps and interactive animated labs. English / Greek.',
 applicationName:'FRONTIER',
 icons:{icon:'/favicon.svg'},
 manifest:'/manifest.webmanifest',
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}