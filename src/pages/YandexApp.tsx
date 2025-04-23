
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IphoneFrame from "@/components/IphoneFrame";

interface SearchResult {
  title: string;
  description: string;
  url: string;
}

const YandexApp = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация поиска
    setTimeout(() => {
      let results: SearchResult[] = [];
      
      // Простые ответы на некоторые запросы
      if (searchQuery.toLowerCase().includes("время в москве")) {
        const moscowTime = new Date().toLocaleString("ru", {
          timeZone: "Europe/Moscow",
          hour: '2-digit',
          minute: '2-digit',
        });
        
        results = [
          {
            title: "Текущее время в Москве",
            description: `Сейчас в Москве ${moscowTime}`,
            url: "https://time.yandex.ru"
          }
        ];
      } else if (searchQuery.toLowerCase().includes("погода")) {
        results = [
          {
            title: "Погода в вашем регионе",
            description: "Сейчас +15°C, облачно с прояснениями",
            url: "https://yandex.ru/pogoda"
          }
        ];
      } else {
        // Общие результаты поиска
        results = [
          {
            title: `Результаты по запросу "${searchQuery}"`,
            description: "Найдено множество страниц по вашему запросу",
            url: "https://yandex.ru/search"
          },
          {
            title: "Яндекс Википедия",
            description: `Информация о "${searchQuery}" в энциклопедии`,
            url: "https://wikipedia.org"
          },
          {
            title: "Новости по теме",
            description: "Последние события, связанные с вашим запросом",
            url: "https://news.yandex.ru"
          }
        ];
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <IphoneFrame>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-red-500"
            >
              Назад
            </Button>
            <h1 className="text-lg font-medium">Яндекс</h1>
            <div className="w-16"></div>
          </div>
          
          {/* Search bar */}
          <div className="p-4 bg-yellow-50">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Найдётся всё..."
                className="border-yellow-400 focus-visible:ring-yellow-400"
              />
              <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                🔍
              </Button>
            </form>
          </div>
          
          {/* Search results */}
          <div className="flex-1 overflow-auto p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div key={index} className="border-b pb-3">
                    <h3 className="text-blue-600 font-medium">{result.title}</h3>
                    <p className="text-sm text-gray-600">{result.description}</p>
                    <p className="text-xs text-green-700 mt-1">{result.url}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500">
                  Введите поисковый запрос и нажмите кнопку поиска
                </p>
              </div>
            )}
          </div>
        </div>
      </IphoneFrame>
    </div>
  );
};

export default YandexApp;
