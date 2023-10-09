import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledBtn } from '../Components/common.styles';

const BackToTopButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 1000;
`;



function BackToTopButtonComponent() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <BackToTopButtonContainer show={isVisible}>
            <StyledBtn onClick={scrollToTop}>Back to Top</StyledBtn>
        </BackToTopButtonContainer>
    );
}

export default BackToTopButtonComponent;
