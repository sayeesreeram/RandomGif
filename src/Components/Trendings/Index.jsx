import React, { useEffect, useState, useContext } from 'react';
import { ErrorDiv, GifCard, GifGrid, GifImage, RetryButton, StyledLink, StyledMainContainer, StyledRowFlex, BackButton, DarkModeSwitchContainer, ToggleButton, } from '../common.styles';
import UseApiFetchDataHandler from '../../CustomComponents/UseApiFetchDataHandler';
import InfiniteScroller from '../../CustomComponents/InfiniteScroller';
import { LoaderDiv } from '../common.styles';
import { trendingEndpoint, apiKey } from "../../util";
import { Link } from 'react-router-dom';
import BackToTopButtonComponent from '../../CustomComponents/BackToTopButtonContainer';
import { DarkModeSwitcherContext } from '../../App';

function Index(props) {
    const { darkMode, setDarkMode } = useContext(DarkModeSwitcherContext)
    const [UrlEndpoint, setUrlEndpoint] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [paginationHandleState, setPaginationHandleState] = useState({
        currentItems: 0,
        totalCount: 0,
    })

    const { data, totalCountOfItems, isLoading, isError, noData, retryApiCall } = UseApiFetchDataHandler(UrlEndpoint, "get")

    const initalApiHandlerForTrendingPage = () => {
        try {
            let URL_TRENDING = `${trendingEndpoint}?api_key=${apiKey}&limit=20&offset=0`;
            setUrlEndpoint(URL_TRENDING);
        }
        catch (e) {
            console.log("ERROR in INITIALAPIHANDLERFORTRENDINGPAGE METHOD")
        }
    }


    const paginationFunctionHandlerForTrending = () => {
        try {
            if (paginationHandleState?.currentItems < paginationHandleState?.totalCount) {
                console.log("SETURL 2")
                setUrlEndpoint(trendingEndpoint + `?api_key=${apiKey}&offset=${paginationHandleState?.currentItems}&limit=20`);
            }
        } catch (e) {
            console.log("ERROR in PAGINATIONFUNCTIONHANDLERFORTRENDING METHOD");
        }

    }

    const handleRetry = () => {
        // When the retry button is clicked, reset the error state and trigger the API call again.
        retryApiCall();
    };

    useEffect(() => {
        initalApiHandlerForTrendingPage();
    }, [])

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                setSearchResults([...searchResults, ...data])
                setPaginationHandleState({ currentItems: paginationHandleState?.currentItems + 20, totalCount: totalCountOfItems })
            }

        }
    }, [data, isError])

    return (
        <StyledMainContainer>
            <StyledRowFlex>
                <Link to="/" className='styledLinkToLeft'>Back</Link>
                <h1 style={{ color: darkMode ? "#fff" : "#000000" }}>Trending GIFz</h1>
            </StyledRowFlex>
            <DarkModeSwitchContainer >
                <ToggleButton right={true}  darkMode={darkMode} onClick={() => setDarkMode((prev) => !prev)}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </ToggleButton>
            </DarkModeSwitchContainer>


            <GifGrid >
                <InfiniteScroller dataListToRender={searchResults} callbackFun={() => paginationFunctionHandlerForTrending()} render={(gif) => {
                    return (
                        <GifCard key={gif.id} >
                            <GifImage src={gif?.images?.original?.url} alt={gif?.title ?? "default title"} />
                        </GifCard>
                    )
                }} />
            </GifGrid>
            {!isError && isLoading && <LoaderDiv />}
            {!isLoading && isError && (
                <StyledRowFlex>
                    <ErrorDiv>Something Went wrong</ErrorDiv>
                    <RetryButton onClick={handleRetry}>Retry</RetryButton>
                </StyledRowFlex>
            )}
            <BackToTopButtonComponent />
        </StyledMainContainer>
    );
}


export default Index;