import { useQuery } from "react-query";
import "./App.css";
import MyRouter from "./Router/MyRouter";
import { useTranslation } from "react-i18next";

function App() {

  const { i18n } = useTranslation();

  const clickHandle = async lang => {
    await i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); 
  }

  return (
    <div className="text-center ">
      Aktiv dil: {i18n.language}<br/>
      <nav>
        <button onClick={() => clickHandle('az-AZ')}>az</button>
        <button onClick={() => clickHandle('en-US')}>en</button>
        <button onClick={() => clickHandle('ru-RU')}>ru</button>
      </nav>
      <MyRouter />
    </div>
  );
}

export default App;
