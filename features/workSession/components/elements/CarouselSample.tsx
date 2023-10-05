import React from 'react'
import styled from 'styled-components'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

import MainTimer from './OnGoingTimerArea/MainTimer/MainTimer'


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

const EmblaSlideImg = styled.img`
  display: block;
  height: var(--slide-height);
  width: 100%;
  object-fit: cover;
`;

const EmblaDot = styled.button`
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

const EmblaDotSelected = styled(EmblaDot)`
  /* Add additional styles when selected */
  /* background: linear-gradient(45deg, var(--brand-primary), var(--brand-secondary)); */
  background-color: red;
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
  &.selected:after {
    /* background: linear-gradient(45deg, var(--brand-primary), var(--brand-secondary)); */
    background-color: red;
  };
`;

const CustomMainTimer = styled(MainTimer)`
  box-shadow: none;
`;
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const taskNames = ['sample1', 'sample2', 'sample3', 'sample4'];

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {slides.map((index) => (
            <EmblaSlide key={index}>
              {/* TODO: replace with valid components */}
              <CustomMainTimer taskName={taskNames[index+1]} isTimerRunning={false} elapsedSeconds={0} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      <EmblaDots>
        {scrollSnaps.map((_, index) => (
          <EmblaDotContainer
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={index === selectedIndex}
            />
        ))}
      </EmblaDots>
    </Embla>
  )
}

export default EmblaCarousel
