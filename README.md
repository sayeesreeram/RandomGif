
Below are the list of features added and few of the comments from my side

No External library used i had used only styled components and normal css for some elements. 

Features Added: 
1. Infinite Scrolling (also we are using render prop in this component so it can used in several places)
2. Dark/Light Mode
3. Back to top
4. Responsivesness
5. Retry Added in case api has failed when scrolling 

Code Reusability:
1. Infinite Scroller(Render Prop Compoenent),BacktoTopButtonContainer and useApiFetchDataHandler has been reused 
2. Also created all the styles in common.styles.js and resused it for the most part
3. Also because useApiFetchDataHandler is a custom hook im reusing all the states defined in it in other components


Also covered almost all the error scenarios in infinite scrolling
1. Retry Btn would be rendered when any api call fails 
2. Try catch added for all the functions 
3. Used optional chaining wherever possible 


//Testing couldnt be completed properly as i had some issues with the jest configuration i have written test cases for HomeGifPageCompoenent .
//Automated tests using cypress i have not worked on it and the same for running tests on CI/CD pipeline
