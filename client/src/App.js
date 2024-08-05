import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';
import Query from './Query';

const App = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSendQuery = async () => {
        if (!query.trim()) return;

        // Add user query to chat
        console.log(query);
        // setMessages(prev => [...prev, {text: query, type: 'user'}]);
        // setMessages([...messages, { text: query, type: 'user' }]);
        // setQuery('');
        console.log(messages);

        try {
            // Replace with your API endpoint
            console.log(query);
            const data = {
                q: query
            };
            console.log(data);
            const response = await axios.post('http://localhost:8083/api/v1/news', data);
            console.log(response);


            // Add API response to chat
            const articles = response.data.result;
            console.log(articles);
            // const articlesMessage = articles.map((article, index) => (
            //   <div key={index}>
            //       <strong>{article.title}</strong><br />
            //       {article.description}<br />
            //       <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a><br /><br />
            //   </div>
            // ));
            // const articlesMessage = articles.map((article, index) => (
            //         <div key={index}>
            //             <strong>{article.title}</strong><br />
            //             {article.description}<br />
            //             <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a><br /><br />
            //         </div>
            //     ));
            // setMessages(articlesMessage);
            console.log(articles);
            // setMessages(prev => [{text: query, type: 'user'}, articles, ...prev]);

            setMessages(prev => [{text: query, type: 'user'}, ...articles, ...prev]);

            // setMessages(articles);
            // setMessages([...messages, { text: articles, type: 'api' }]);
            console.log(messages);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <div className="container">
            <div className="left">
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter your query..."
                />
                <button onClick={handleSendQuery}>Send</button>
            </div>
            <div className="right">
                {
                    
                    messages.map((message, index) => {
                        if(message?.type==='user'){
                            return <Query text={message.text}/>;
                        }
                        if(message.author===null || message.title==="[Removed]"){
                            return null;
                        }
                        return  <Card message={message}/>;
                    }
                    )
                }
            </div>
        </div>

        //     <div className="app">
        //         <div className="chat-container">
        //         {/* <div>
        //           {messages.map((message, index) => (
        //             <div key={index} style={{ marginBottom: '20px' }}>
        //               <h3>{message.title}</h3>
        //               <p>{message.description}</p>
        //               <a href={messages.url} target="_blank" rel="noopener noreferrer">Read more</a>
        //             </div>
        //           ))}
        //         </div> */}
        //             <div className="chat-box">
        //                 {messages.map((message, index) => (
        //                     <div
        //                         key={index}
        //                         className={`message ${message.type === 'user' ? 'user-message' : 'api-message'}`}
        //                     >
        //                         {message.type === 'api' ? (
        //                             <div dangerouslySetInnerHTML={{ __html: message.text }} />
        //                         ) : (
        //                             message.text
        //                         )}
        //                     </div>
        //                 ))}
        //             </div>
        //             <div className="input-container">
        //                 <input
        //                     type="text"
        //                     value={query}
        //                     onChange={handleQueryChange}
        //                     placeholder="Enter your query..."
        //                 />
        //                 <button onClick={handleSendQuery}>Send</button>
        //             </div>
        //         </div>
        //     </div>
    );
};

export default App;
