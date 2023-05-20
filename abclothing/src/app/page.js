import dynamic from 'next/dynamic';
// Load the App component dynamically
const App = dynamic(() => import('./pages/App'), { ssr : false});

export default function Home() {
  return <App />;
}