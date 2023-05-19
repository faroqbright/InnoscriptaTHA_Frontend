import { useContext, useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from "./contextHook";
import { Stack, TextField } from "@mui/material";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from "axios";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const News = (props) => {
  const [value, setValue] = React.useState(dayjs('2023-05-18'));
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('telsa')
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const sources = ['newsapi', 'nyt', 'guardian']
  const { source, isLoading } = useContext(AuthContext)


  const updateNews = async () => {
    setPage(1)
    props.setProgress(10);
    const d = (value.$d.toLocaleString().split(',')[0].split('/').reverse())
    let a = d[1]
    d[1] = d[2]
    d[2] = a
    let date = d.join('-')
    console.log(date)
    const url = `http://appcrates.net/test_task_apis/public/api/articles/search?search=${keyword}&date=${date}8&page=${1}&pageSize=10`;
    // const url = `https://api.nytimes.com/svc/archive/v1/2019/1.json?api-key=RGSikx9UH7tGHxtskW3OGWdbv9rRUGAM`;
    setLoading(true)
    let data = await axios.get(url, {
      headers: {
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDJkOWFkY2EwZDE1NGE4NzIzZWE5MTk3OGQ3YmI0NGFiOGNiN2Q3MTUyNGEzYmJjZTNmYzUyYzIyZjQxNjIzY2Y4NDFiOTM5ZWVkOGEyNDIiLCJpYXQiOjE2ODQ0MTE1NDEuNjg2NDQxLCJuYmYiOjE2ODQ0MTE1NDEuNjg2NDQ0LCJleHAiOjE3MTYwMzM5NDEuNjc0NjEzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MJ9jB3RE7dFf1-WL90iuuZvkAMfXNLkFauQ0AxEdmjTAAu9uUiqHUFJMmedRlkAJK9BRL_-ktCIA4TSULP3SrC0FeRQD2PIMSGBRNvlxUP9mr52zeZxyqdgXBc4CEcOy8HZmtR49g6qnJeX3DO30TThBAOpA6yVq6aQQzlxPyaWnyolEF05H8AP7DYSR7xrTpQCguSOAuuIWRKaNbX6wqjhAgmcSF0Ok7UPGawDaAbEvmDYMn07l6tYRJP0A5ltrMY_tkIR0Dp9tsjpGqpiu-70Kg8q8R7hwpX7sl9LUEg5TmoHH_U4BUMyHAhaG8C4heJ4c6V9g1v2gPo4iRaLAwUAfucAtk2-OQ5OTxIkGQnfVXXUCOVtIuJkXsAmNhUJbBrGrWeQU6te7i_GJqpLEaJuG1cUcZth78FT7fdu3fKGa8kN1fmy16KhXcNp3ZKXHViJpLDKePg1j4S6ngwNLo_TP3Lxq397I2IxqfDFRWUrDwHnJXN2EOJ4mMLLIYQRjrAQeU1aoqi0HsPBoTf6iz7sXLFC1sGUQQ8-3OkXg7I2BA3FZR2HmGGxS7Z4fleyKI3b1lvggDTLxYcY5wBty4y-lgIejLqidfL3wZsWBMpx-o1spnZt9GmSK99AwAnUpb6M2qTZZgEEmYwAiOmHOeAVa0N0RIquqIA5E5O6hKNk`,
      }
    });
    props.setProgress(30);
    let parsedData = await data.data.data;
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)
  }
  useEffect(() => {
    // document.title = `${(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} - NewsZilla`;
    updateNews();
  }, [])
  const fetchMoreData = async () => {
    const url = `http://appcrates.net/test_task_apis/public/api/articles/search?search=${keyword}&page=${page}&pageSize=10`;
    setPage(page + 1)
    setLoading(true)
    let data = await axios.get(url, {
      headers: {
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDJkOWFkY2EwZDE1NGE4NzIzZWE5MTk3OGQ3YmI0NGFiOGNiN2Q3MTUyNGEzYmJjZTNmYzUyYzIyZjQxNjIzY2Y4NDFiOTM5ZWVkOGEyNDIiLCJpYXQiOjE2ODQ0MTE1NDEuNjg2NDQxLCJuYmYiOjE2ODQ0MTE1NDEuNjg2NDQ0LCJleHAiOjE3MTYwMzM5NDEuNjc0NjEzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.MJ9jB3RE7dFf1-WL90iuuZvkAMfXNLkFauQ0AxEdmjTAAu9uUiqHUFJMmedRlkAJK9BRL_-ktCIA4TSULP3SrC0FeRQD2PIMSGBRNvlxUP9mr52zeZxyqdgXBc4CEcOy8HZmtR49g6qnJeX3DO30TThBAOpA6yVq6aQQzlxPyaWnyolEF05H8AP7DYSR7xrTpQCguSOAuuIWRKaNbX6wqjhAgmcSF0Ok7UPGawDaAbEvmDYMn07l6tYRJP0A5ltrMY_tkIR0Dp9tsjpGqpiu-70Kg8q8R7hwpX7sl9LUEg5TmoHH_U4BUMyHAhaG8C4heJ4c6V9g1v2gPo4iRaLAwUAfucAtk2-OQ5OTxIkGQnfVXXUCOVtIuJkXsAmNhUJbBrGrWeQU6te7i_GJqpLEaJuG1cUcZth78FT7fdu3fKGa8kN1fmy16KhXcNp3ZKXHViJpLDKePg1j4S6ngwNLo_TP3Lxq397I2IxqfDFRWUrDwHnJXN2EOJ4mMLLIYQRjrAQeU1aoqi0HsPBoTf6iz7sXLFC1sGUQQ8-3OkXg7I2BA3FZR2HmGGxS7Z4fleyKI3b1lvggDTLxYcY5wBty4y-lgIejLqidfL3wZsWBMpx-o1spnZt9GmSK99AwAnUpb6M2qTZZgEEmYwAiOmHOeAVa0N0RIquqIA5E5O6hKNk`,
      }
    });
    let parsedData = await data.data.data;
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };
  return (
    <>
      {!isLoading &&
        <div className="container my-3">
          <h1 style={{ marginTop: '70px' }} className="text-center">NewsZilla - Top {(props.category).charAt(0).toUpperCase() + (props.category).slice(1)} Headlines</h1>

          <Stack sx={{ flexDirection: { md: 'row' }, justifyContent: 'space-between', gap: '10px',  }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: {xs:'100%',md:400}, marginTop: '10px' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search By Keyword"
                inputProps={{ 'aria-label': 'Search by keyword' }}
                value={keyword}
                onChange={e => { setKeyword(e.target.value); updateNews() }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => updateNews()}>
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
            <Stack sx={{ display: 'flex', gap: '10px',marginTop: {xs:'10px',md:'10px'} }}>
              {/* <IconButton type="button" sx={{ p: '10px',  }} aria-label="search" onClick={() => updateNews()}>
                <FilterListIcon />
              </IconButton> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    label="Select Date"
                    value={value}
                    onChange={(newValue) => { setValue(newValue) }

                    }
                    size="small"
                    disableFuture
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Stack>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={(loading) && <Spinner />}
          >
            <div className="container">
              <div className="row">

                {articles.map((element) => {
                  return (
                    <div key={element.url} className="col-md-4">
                      <NewsItem
                        author={element.author}
                        date={element.publishedAt}
                        title={element.title ? element.title : ""}
                        description={element.description ? element.description : ""}
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                      />
                    </div>

                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      }
      {isLoading &&
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <Spinner />
        </div>
      }
    </>
  );

}
News.defaultProps = {
  country: "in",

  category: "general",
};
News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

export default News;
