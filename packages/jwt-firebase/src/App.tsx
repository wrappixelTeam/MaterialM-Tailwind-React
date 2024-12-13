import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import ScrollToTop from './components/shared/ScrollToTop';
import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme';


function App() {
  const routing = useRoutes(Router);

  return (
    <>
      <ThemeModeScript />
      <Flowbite theme={{ theme: customTheme }}>
        <ScrollToTop>{routing}</ScrollToTop>
      </Flowbite>
    </>
  );
}

export default App;
