import dotenv from "dotenv";
import axios from 'axios';
import NewsAPI from 'newsapi';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = function (intentData, language, sort, number, from, to) {

    return newsapi.v2.everything({
        q: intentData || 'technology',
        language: language || 'en',
        sortBy: sort || 'relevancy',
        pageSize: number || 5,
        from: from || '2024-07-15',
        to: to || '2024-08-05',
        page: 1
    })

    // return newsapi.v2.topHeadlines({
    // q: intentData,
    // language: 'en',
    // country: 'in'
    // })
}

export const newsController = async (req, res) => {
    try {
        const intentData = req.body.q;

        const completionjson = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to output JSON. You need to fetch JSON for News api take out th fields q i.e. query (topic of news), sortBy (possible values are = relevancy, popularity, publishedAt), pageSize (number of news), language (type of language for the news, The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: ar de en es fr he it nl no pt ru sv ud zh), and again two parameters 'from' and 'to' from (A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2024-08-05 or 2024-08-05T04:17:37)) and to A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2024-08-05 or 2024-08-05T04:17:37) if date are not mentioned keep it null, if any of the data is not mentioned then keep it null",
                },
                { role: "user", content: intentData },
            ],
            model: "gpt-4o-mini",
            max_tokens: 200,
            response_format: { type: "json_object" },
        });
        console.log(completionjson.choices[0].message.content);
        const jsonresponse = completionjson.choices[0].message.content;
        const jsonObject = JSON.parse(jsonresponse);

        const queryjson = jsonObject.q;
        const sortByjson = jsonObject.sortBy;
        const languagejson = jsonObject.language;
        const pageSizejson = jsonObject.pageSize;
        const fromjson = jsonObject.from;
        const tojson = jsonObject.to;

        console.log('Query:', queryjson);
        console.log('Sort By:', sortByjson);
        console.log('Language:', languagejson);
        console.log('Page Size:', pageSizejson);
        console.log('From:', fromjson);
        console.log('To:', tojson);

        console.log("---------------------------------------------------------------------------------------");



        // const prompt = "from the following text extract the appropiate topic of news which will be feed to news api and topic should be one word or short string, if there is mention of language in text then extract that in short form (The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: ar de en es fr he it nl no pt ru sv ud zh) like for english en, french fr, Japanese ja, etc, if there is mention of sort by it will have the following values relevancy, popularity, publishedAt then extract that in new line and if there is mention of number of pages or any number less than 10 then extract the number in new line. here is the text: " + intentData;
        // const completion = await openai.chat.completions.create({
        //     messages: [
        //         {
        //             role: "system",
        //             content: prompt
        //         }
        //     ],
        //     model: "gpt-4o-mini",
        //     max_tokens: 200,
        // });
        // console.log(completion);
        // console.log(completion.choices[0].message.content);

        // const textresult = completion.choices[0].message.content;

        // const languageRegex = /\b(ar|de|en|es|fr|he|it|nl|no|pt|ru|sv|ud|zh)\b/;

        // const matchlanguage = textresult.match(languageRegex);

        // const language = matchlanguage ? matchlanguage[0] : 'en';

        // console.log(language);


        // const sortRegex = /\b(relevancy|popularity|publishedAt)\b/;

        // const matchsort = textresult.match(sortRegex);

        // const sort = matchsort ? matchsort[0] : 'relevancy';

        // console.log(sort);


        // const numberRegex = /\d+/;

        // const matchnumber = textresult.match(numberRegex);

        // const number = matchnumber ? parseInt(matchnumber[0], 10) : 5;

        // console.log(number);


        // const lines = textresult.split('\n').map(line => line.trim());

        // const firstLine = lines.length > 0 ? lines[0] : null;

        // const TopicPrefix = 'Topic: ';
        // const topicPrefix1 = 'topic: ';
        // const content = firstLine && (firstLine.startsWith(TopicPrefix) || firstLine.startsWith(topicPrefix1))
        //     ? firstLine.substring(TopicPrefix.length).trim() : firstLine;

        // console.log(content);
        // const newtextresult = content;

        // console.log(textresult);


        console.log("---------------------------------------------------------------------");




        // const prompt = "from the following text extract the appropiate topic of news which will be feed to news api and topic should be one word or short string, here is the text: "+intentData;
        // const completion = await openai.chat.completions.create({
        //     messages: [
        //         { 
        //             role: "system", 
        //             content: prompt
        //         }
        //     ],
        //     model: "gpt-4o-mini",
        //     max_tokens: 20,
        // });
        // console.log(completion.choices[0].message.content);

        // const textresult = completion.choices[0].message.content;
        // console.log(textresult);







        // const intentData=req.body.q;
        // const prompt = intentData + "for this given data extract the useful informtion which will be feed to newsapi news api takes the param q which is the topic of the news";
        // const result = await openai.completions.create({
        //     model: "gpt-4o-mini",
        //     prompt: prompt,
        //     max_tokens: 20,
        // });
        // console.log(result.choices[0].message.content);
        // const textresult = completion.choices[0].message.content;
        // console.log(textresult);
        // const completion = await openai.completions.create({
        //     model: "gpt-3.5-turbo-instruct",
        //     prompt: "Say this is a test.",
        //     max_tokens: 7,
        //     temperature: 0,
        //   });


        // const completion = await openai.chat.completions.create({
        //     messages: [
        //         { 
        //             role: "user", 
        //             content: textinput
        //         }
        //     ],
        //     model: "gpt-4o-mini",
        //     max_tokens: 200,
        // });
        // console.log(completion.choices[0].message.content);

        // const textresult = completion.choices[0].message.content;
        // console.log(textresult);



        const response = await fetchNews(queryjson, languagejson, sortByjson, pageSizejson, fromjson, tojson);

        // const response = await fetchNews(newtextresult, language, sort, number);
        if (response) {
            console.log(response.articles);
        } else {
            console.log('No articles found.');
        }
        console.log(response);
        console.log(response.articles.length);



        //if want to guve the bot like response
        // const allarticles = response.articles;
        // const newsdata = allarticles.map((article) =>
        //     `Title: ${article.title}\nDescription: ${article.description}`
        // ).join("\n\n");

        // const prompt1 = "There are articles data along with the title and you should act as a news assitant and responed with like you are replying to the chat and use the following data to reply as a conversation" + newsdata;
        // const completion1 = await openai.chat.completions.create({
        //     messages: [
        //         {
        //             role: "system",
        //             content: prompt1
        //         }
        //     ],
        //     model: "gpt-4o-mini",
        //     max_tokens: 200,
        // });
        // console.log(completion1);
        // console.log(completion1.choices[0].message.content);
        // const singleresponse = completion1.choices[0].message.content;

        // return res.status(200).json({
        //     message: "successful!!",
        //     result: singleresponse
        // });



        return res.status(200).json({
            message: "successful!!",
            result: response.articles
        });





        // const response = await newsapi.v2.everything({
        //     q: "sports",
        //     language: "en",   
        //     sortBy: "popularity",
        //     pageSize: 20,
        //     page: 1,
        // });
        // console.log(response);
        // console.log(response.articles.length);

        // res.status(200).json({
        //     articles: response.articles,
        //     message: "news fetched successfully",
        // });


        // newsapi.v2.topHeadlines({
        //     sources: 'bbc-news,the-verge',
        //     q: 'bitcoin',
        //     category: 'business',
        //     language: 'en',
        //     country: 'us'
        //   }).then(response => {
        //     console.log(response);
        //   });
        // const response = await axios.get(`${BASE_URL}/everything`, {
        //     params: {                        
        //         q: query,
        //         apiKey: API_KEY
        //     }
        // });
        // console.log(response.data.articles);
        // const query = 'technology';

        // const articles = await fetchNews(query);

        // if (articles.length > 0) {
        //     articles.forEach((article, index) => {
        //         console.log(`${index + 1}. ${article.title}`);
        //         console.log(`   ${article.description}`);
        //         console.log(`   Read more: ${article.url}`);
        //         console.log('---');
        //     });
        // } else {
        //     console.log('No articles found.');
        // }



        // const query = req.query.q || 'technology';
        // const articles = await fetchNews(query);
        // res.json(articles);



        // const question = req.body.question;
        // const answer = await chain.call({
        //     query: question
        // });
        // console.log(answer);
        // return res.status(200).json({
        //     result: answer.text,
        // });


    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};
