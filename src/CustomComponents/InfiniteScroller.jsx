import React, { useRef, useEffect, Children } from 'react';

function InfiniteScroller({ dataListToRender, callbackFun, render }) {
    const lastElementRef = useRef(null);


    useEffect(() => {
        if (lastElementRef != null) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.7,
            };
            const newObserver = new IntersectionObserver(handleIntersection, options);
            if (lastElementRef.current) {
                newObserver.observe(lastElementRef.current);
            }

            function handleIntersection(entries) {
                if (entries[0]?.isIntersecting) {
                    callbackFun();
                }

            }
            return () => {
                newObserver.disconnect();
            };
        }
    }, [dataListToRender])

    if (dataListToRender?.length > 0) {
        return (
            <>
                {dataListToRender.map((gif, index) => {
                    return (
                        <div ref={index == dataListToRender.length - 1 ? lastElementRef : null}>
                            {render(gif,index)}
                        </div>
                    )
                })

                }
            </>
        );
    }

}

export default InfiniteScroller;