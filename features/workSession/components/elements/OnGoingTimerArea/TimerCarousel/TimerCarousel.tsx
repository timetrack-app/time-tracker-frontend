import React from 'react';
import styled from 'styled-components';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import DotButton, { useDotButton } from './DotButton';

// https://www.embla-carousel.com/
// Used the generator in the official doc of Embla

const Embla = styled.div`
  --slide-spacing: 5px;
  --slide-size: 100%;
  /* --slide-height: 19rem; */
  --slide-height: 100%;
  /* padding: 1.6rem; */

  width: 100%;
  height: 100%;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const EmblaContainer = styled.div`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
  width: 100%;
  height: 100%;
`;

const EmblaSlide = styled.div`
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
  position: relative;
`;

const EmblaDot = styled(DotButton)`
  -webkit-appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  display: inline-flex;
  text-decoration: none;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
`;

const EmblaDots = styled.div`
  z-index: 1;
  /* bottom: 1.6rem; */
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmblaDotContainer = styled.div<{isSelected: boolean}>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  /* margin-right: 0.75rem;
  margin-left: 0.75rem; */
  &:after {
    background-color: ${(props) =>  props.isSelected ? props.theme.colors.text : props.theme.colors.border};
    border-radius: 50%;
    width: 20%;
    height: 20%;
    content: '';
  }
`;

type Props = {
  slides: { [key: string]: React.ReactNode }
  options?: EmblaOptionsType
};

const TimerCarousel = ({ slides, options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
        {Object.entries(slides).map(([key, SlideComponent]) => (
            <EmblaSlide key={key}>
              {SlideComponent}
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      <EmblaDots>
        {scrollSnaps.map((_, index) => (
          <EmblaDot key={index}>
            <EmblaDotContainer
            key={index}
            onClick={() => onDotButtonClick(index)}
            isSelected={index === selectedIndex}
          />
          </EmblaDot>
        ))}
      </EmblaDots>
    </Embla>
  );
};

export default TimerCarousel;
