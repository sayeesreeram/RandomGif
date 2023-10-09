import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StyledMainContainer, SearchBarContainer, SearchInput, GifGrid, GifCard, GifImage, SearchButton, LoaderDiv, ErrorDiv, RetryButton, StyledRowFlex, DarkModeSwitchContainer, ToggleButton, BackToTopBtn, BackToTopButtonContainer, StyledBtn } from "./common.styles";
import { searchingEndPoint, apiKey } from "../util";
import UseApiFetchDataHandler from '../CustomComponents/UseApiFetchDataHandler';
import InfiniteScroller from '../CustomComponents/InfiniteScroller';
import BackToTopButtonComponent from '../CustomComponents/BackToTopButtonContainer';
import { DarkModeSwitcherContext } from '../App';



/*
Features Added: Infinite Scrolling,Responsiveness,
Custom component for infinite scrolling and also used render prop in here so that this can be reused in other places
Custom component is added for data fetching as well
Added a loader using css as had some issues in setting up the tailwind css
Added Back to top in case if user wants to reach the top as we are implementing infinite scrolling
Dark mode and light mode also added
*/


function HomeGifPageComponent() {

    const { darkMode, setDarkMode } = useContext(DarkModeSwitcherContext)
    const [searchTerm, setSearchTerm] = useState({
        onChangeValue: "",
        submitValue: ""
    });
    const [searchResults, setSearchResults] = useState([]);
    const [UrlEndpoint, setUrlEndpoint] = useState("");

    /* error call state is added in the scenario lets say for example initial api call gets failed but if you want to try again. The useEffect inside 
    useApiFetchDataHandler wont get triggered as the urlendpoint which we are passing inside the function didnt change hence to force that call we have 
    this state */
    const [errorCall, setErrorCall] = useState(false);

    const [paginationHandleState, setPaginationHandleState] = useState({
        currentItems: 0,
        totalCount: 0,
    })
    const [loadedCount, setLoadedCount] = useState(0)

    //Custom hook for data fetching
    const { data, totalCountOfItems, isLoading, isError, noData, retryApiCall } = UseApiFetchDataHandler(UrlEndpoint, "get")


    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                setSearchResults([...searchResults, ...data])
                setPaginationHandleState({ currentItems: paginationHandleState?.currentItems + 20, totalCount: totalCountOfItems })
            }
        }
    }, [data, isError])

    const handleSearch = async () => {
        try {
            /* this below condition is written so that the api call can be avoided in terms of same search string but if previous request has errored out it
        it will pass the loop*/
            if (searchTerm?.onChangeValue?.trim() !== searchTerm?.submitValue?.trim() && !isError) {
                setPaginationHandleState({
                    currentItems: 0,
                    totalCount: 0,
                })
                setSearchResults([])
                setSearchTerm({ ...searchTerm, submitValue: searchTerm.onChangeValue });
                setUrlEndpoint(searchingEndPoint + `?api_key=${apiKey}&q=${searchTerm.onChangeValue}&offset=0&limit=20`);
            }
        } catch (e) {
            console.log("ERROR in HANDLESEARCH METHOD");
        }
    };

    const paginationFunctionHandler = () => {
        try {
            if (paginationHandleState.currentItems < paginationHandleState.totalCount && !isError) {
                setUrlEndpoint(searchingEndPoint + `?api_key=${apiKey}&q=${searchTerm.onChangeValue}&offset=${paginationHandleState.currentItems}&limit=20`);
            }
        } catch (e) {
            console.log("ERROR in PAGINATIONFUNCTIONHANDLER METHOD");
        }
    };


    const handleRetry = () => {
        // When the retry button is clicked, reset the error state and trigger the API call again.
        retryApiCall();
    };



    return (
        <StyledMainContainer>
            <h1 style={{ color: darkMode ? "#fff" : "#000000" }}>GIFz</h1>
            <SearchBarContainer>
                <SearchInput
                    type="text"
                    placeholder="Enter a gif you want to search"
                    value={searchTerm?.searchTerm}
                    autoFocus
                    onChange={(e) => setSearchTerm({ ...searchTerm, onChangeValue: e.target?.value ?? "" })}
                />
                <StyledBtn onClick={() => { searchTerm?.onChangeValue?.length > 0 && handleSearch() }}>Search</StyledBtn>
            </SearchBarContainer>
            <Link className="styledLinkToRight" to="/trendings">Trendings</Link>
            <DarkModeSwitchContainer><ToggleButton left={true} darkMode={darkMode} onClick={() => setDarkMode((prev) => !prev)}>{darkMode ? "Light Mode" : "Dark Mode"}</ToggleButton></DarkModeSwitchContainer>
            {noData ? (
                <ErrorDiv>No Data Found...</ErrorDiv>
            ) : (<div >

                <GifGrid >
                    {/*Render prop has been used so that this Infinite Loader component can be used in multiple places. Hence preventing unneccessary duplication of codes */}
                    <InfiniteScroller dataListToRender={searchResults} callbackFun={() => paginationFunctionHandler()} render={(gif, index) => {
                        return (
                            <GifCard key={gif.id} style={{ display: index > paginationHandleState.currentItems && isLoading ? "none" : "block" }}>
                                <GifImage src={gif?.images?.original?.url} data-testid="default title" alt={gif?.title ?? "default title"} />
                            </GifCard>
                        )
                    }} />
                </GifGrid>
                {isError && !isLoading && (
                    <StyledRowFlex>
                        <ErrorDiv>Something Went wrong</ErrorDiv>
                        <StyledBtn onClick={handleRetry}>Retry</StyledBtn>
                    </StyledRowFlex>
                )}

            </div>)}
            {!noData && !isError && isLoading && <LoaderDiv />}
            <BackToTopButtonComponent />

        </StyledMainContainer>
    );
}

export default HomeGifPageComponent;